import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}) => {
  const data = {
    from: 'your-email@example.com',
    to,
    subject,
    text,
    html,
    replyTo,
  };

  return await resend.emails.send({
    ...data,
    react: null,
  });
};
