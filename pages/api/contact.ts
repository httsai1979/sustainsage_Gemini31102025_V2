import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { z } from 'zod';
import { CONTACT_EMAIL } from '@/content/siteStrategy';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  language: z.enum(['English', '繁體中文']),
  transition: z.enum(['career-change', 'returning-to-work', 'new-to-uk', 'leadership-transition']),
  useful: z.string().trim().min(20).max(2000),
  privacy: z.literal(true),
});

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character] as string));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Please check the required fields.' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_EMAIL_FROM;
  const to = process.env.RESEND_EMAIL_TO || CONTACT_EMAIL;
  if (!apiKey || !from) {
    console.error('[contact] RESEND_API_KEY or RESEND_EMAIL_FROM is not configured');
    return res.status(503).json({ error: `Email delivery is not configured. Please email ${CONTACT_EMAIL}.` });
  }

  try {
    const resend = new Resend(apiKey);
    const data = parsed.data;
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Fit conversation request - ${data.name}`,
      html: `<h1>Fit conversation request</h1><p><strong>Name:</strong> ${escapeHtml(data.name)}</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p><p><strong>Language:</strong> ${escapeHtml(data.language)}</p><p><strong>Transition:</strong> ${escapeHtml(data.transition)}</p><p><strong>What would make it useful:</strong></p><p>${escapeHtml(data.useful).replace(/\n/g, '<br>')}</p>`,
    });
    if (error) {
      console.error('[contact] Resend error', error);
      return res.status(502).json({ error: `Delivery failed. Please email ${CONTACT_EMAIL}.` });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] Unexpected delivery error', error);
    return res.status(500).json({ error: `Delivery failed. Please email ${CONTACT_EMAIL}.` });
  }
}
