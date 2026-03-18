import nodemailer from 'nodemailer';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

const user = process.env.EMAIL_USER || '';
const pass = process.env.EMAIL_PASS || '';

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export async function sendEmail(to: string, subject: string, bodyText: string) {
  try {
    const info = await transporter.sendMail({
      from: user,
      to,
      subject,
      text: bodyText,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function getInbox(limit = 20) {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST || 'outlook.office365.com',
    port: parseInt(process.env.IMAP_PORT || '993', 10),
    secure: true,
    auth: {
      user,
      pass,
    },
    logger: false,
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    try {
      const messages = [];
      const status = await client.mailboxOpen('INBOX');
      const totalMessages: number = status.exists;
      
      if (totalMessages === 0) return [];
      
      const start = Math.max(1, totalMessages - limit + 1);
      const sequence = `${start}:*`;

      for await (const message of (client.fetch as any)(sequence, { envelope: true, source: true, flags: true })) {
        const parsed = await simpleParser(message.source);
        
        messages.push({
          id: message.uid.toString(),
          subject: parsed.subject || '(No Subject)',
          from: {
            emailAddress: {
              name: parsed.from?.value[0]?.name || '',
              address: parsed.from?.value[0]?.address || ''
            }
          },
          receivedDateTime: parsed.date?.toISOString() || new Date().toISOString(),
          isRead: message.flags.has('\\Seen'),
          bodyPreview: parsed.text ? parsed.text.substring(0, 100) : ''
        });
      }
      
      return messages.reverse(); // Newest first
    } finally {
      lock.release();
    }
  } catch (error) {
    console.error('Error fetching inbox:', error);
    throw error;
  } finally {
    await client.logout();
  }
}
