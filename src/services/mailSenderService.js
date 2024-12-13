const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, playlistOwner, playlistDetails) {
    const message = {
      from: 'Open Music API Team <noreply@openmusicapi.com>',
      to: targetEmail,
      subject: 'Export Playlist Songs',
      text: `Hello ${playlistOwner},\n\nThank you for using Open Music API!\n\nHere's your exported playlist songs, hope you enjoy it!If you have any questions or need further assistance, feel free to contact us via :\nsupport@openmusicapi.com\n\nEnjoy your music and have a great day!\n\nBest regards,\nOpen Music API Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #007BFF;">Hello ${playlistOwner},</h2>
          <p>Thank you for using <strong>Open Music API</strong>!</p>
          <p>Here's your exported playlist songs, hope you enjoy it!</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
          <p style="font-size: 14px; color: #555;">
            If you have any questions or need further assistance, feel free to contact us via : <br>
            <a href="mailto:support@openmusicapi.com" style="color: #007BFF;">support@openmusicapi.com</a>.<br>
            Enjoy your music and have a great day!
          </p>
          <p style="margin-top: 20px; font-size: 14px;">
            Best regards,<br>
            <strong>Open Music API Team</strong>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'playlistSongs.json',
          content: JSON.stringify(playlistDetails, null, 2),
          contentType: 'application/json',
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
