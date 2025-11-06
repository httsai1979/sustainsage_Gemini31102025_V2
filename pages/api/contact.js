import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.RESEND_EMAIL_TO;
const emailFrom = process.env.RESEND_EMAIL_FROM;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { fullName, email, topic, message, consent } = req.body || {};

    if (!fullName || !email || !topic || !message || consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      <p>${message.replace(/\n/g, '<br>')}</p>
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
