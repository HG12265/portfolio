import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'itsgowtham.dev@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'itsgowtham.dev@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const sendContactNotification = async ({ name, email, subject, message }) => {
  if (!SMTP_PASS) {
    console.log(`[Email Notice] SMTP_PASS not set in .env. Saved message from '${name}' (${email}) to Admin Studio Inbox & Database.`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0B1120; color: #F8FAFC; padding: 24px; borderRadius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #1E293B;">
        <div style="border-bottom: 2px solid #2563EB; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #38BDF8; margin: 0; font-size: 20px;">📨 New Portfolio Contact Inquiry</h2>
          <p style="color: #94A3B8; margin: 4px 0 0 0; font-size: 13px;">Received from Portfolio Website (gowthamg.dev)</p>
        </div>

        <div style="background-color: #111827; padding: 16px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #38BDF8;">From:</strong> ${name} (&lt;<a href="mailto:${email}" style="color: #60A5FA;">${email}</a>&gt;)</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #38BDF8;">Subject:</strong> ${subject || 'General Inquiry'}</p>
          <p style="margin: 0; font-size: 14px;"><strong style="color: #38BDF8;">Received Date:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background-color: #0F172A; padding: 20px; border-radius: 12px; border: 1px solid #1E293B; margin-bottom: 24px;">
          <h4 style="color: #94A3B8; text-transform: uppercase; font-size: 11px; tracking-wider; margin: 0 0 10px 0;">Message Content:</h4>
          <p style="font-size: 14px; line-height: 1.6; color: #E2E8F0; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="text-align: center;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-weight: bold; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-size: 13px;">
            Reply to ${name}
          </a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name} via Portfolio" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject || 'New Message from ' + name}`,
      html: htmlContent
    });

    console.log(`[Email Notice] Notification email sent successfully to ${NOTIFICATION_EMAIL}`);
    return true;
  } catch (err) {
    console.error('[Email Notice Error]', err.message);
    return false;
  }
};
