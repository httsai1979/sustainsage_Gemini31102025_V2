import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const requiredEnvVars = ['RESEND_API_KEY', 'RESEND_EMAIL_TO', 'RESEND_EMAIL_FROM'] as const;
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length) {
  throw new Error(`[contact api] Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const resendApiKey = process.env.RESEND_API_KEY as string;
const emailTo = process.env.RESEND_EMAIL_TO as string;
const emailFrom = process.env.RESEND_EMAIL_FROM as string;
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;

const resend = new Resend(resendApiKey);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, { count: number; expiresAt: number }>();

function getClientIdentifier(req: NextApiRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwarded = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return forwarded?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
}

function isThrottled(clientId: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(clientId);

  if (!entry || entry.expiresAt <= now) {
    requestLog.set(clientId, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  requestLog.set(clientId, { ...entry, count: entry.count + 1 });
  return false;
}

async function verifyTurnstile(token?: string | null) {
  if (!turnstileSecret) return { ok: true } as const;
  if (!token) return { ok: false, message: 'Missing Turnstile token' } as const;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(token)}`,
  });

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
  return result.success ? { ok: true } : { ok: false, message: 'Turnstile verification failed' };
}

async function verifyHCaptcha(token?: string | null) {
  if (!hcaptchaSecret) return { ok: true } as const;
  if (!token) return { ok: false, message: 'Missing hCaptcha token' } as const;

  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(hcaptchaSecret)}&response=${encodeURIComponent(token)}`,
  });

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
  return result.success ? { ok: true } : { ok: false, message: 'hCaptcha verification failed' };
}

async function verifyBotProtection(body: NextApiRequest['body']) {
  if (!turnstileSecret && !hcaptchaSecret) {
    return { ok: true } as const;
  }

  const turnstileResult = await verifyTurnstile((body as { turnstileToken?: string })?.turnstileToken);
  if (!turnstileResult.ok) return turnstileResult;

  const hcaptchaResult = await verifyHCaptcha((body as { hcaptchaToken?: string })?.hcaptchaToken);
  return hcaptchaResult;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const clientId = getClientIdentifier(req);
  if (isThrottled(clientId)) {
    return res.status(429).json({ error: 'Too many requests. Please slow down and try again.' });
  }

  try {
    const { fullName, email, topic, message, consent, turnstileToken, hcaptchaToken } = req.body || {};

    if (!fullName || !email || !topic || !message || consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const verificationResult = await verifyBotProtection({ turnstileToken, hcaptchaToken });
    if (!verificationResult.ok) {
      return res.status(400).json({ error: verificationResult.message });
    }

    const subject = `New Contact Form Submission from ${fullName}`;
    const htmlContent = `
      <h1>SustainSage Group Ltd. Contact Form</h1>
      <p>You have received a new message from your website contact form.</p>
      <hr>
      <h2>Contact Details</h2>
      <ul>
        <li><strong>Name:</strong> ${fullName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Topic of Interest:</strong> ${topic}</li>
        <li><strong>Consent to be contacted:</strong> ${consent ? 'Yes' : 'No'}</li>
      </ul>
      <hr>
      <h2>Message</h2>
      <p>${String(message).replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [emailTo],
      subject,
      html: htmlContent,
      reply_to: email,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (err) {
    console.error('API Handler Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
