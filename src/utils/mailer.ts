import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
} as nodemailer.TransportOptions);

const baseUrl = process.env.BASE_URL;

class EmailService {
    

    async sendResetPasswordEmail(to: string, hashedToken: string) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${baseUrl}/api/v1/auth/reset-password?token=${hashedToken}`,
        };

        await transporter.sendMail(mailOptions);
    }
}

export default EmailService;
