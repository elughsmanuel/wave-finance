import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';

interface User {
    email: string;
    firstName: string;
}

class EmailService {
    to: string;
    firstName: string;
    url: string;
    from: string;

    constructor(user: User, url: string,) {
        this.from = `${process.env.ADMIN_FIRST_NAME} ${process.env.ADMIN_LAST_NAME} <${process.env.ADMIN_EMAIL}>`;
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
    }

    newTransport() {
        if(process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            } as nodemailer.TransportOptions);
        }

        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        } as nodemailer.TransportOptions);
    }

    // Send the actual email
    async send(template: string, subject: string) {
        // 1. Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../../views/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject,
        });

        // 2. Define email options
        const mailOptions: nodemailer.SendMailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html),
        };

        // 3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async sendResetPasswordEmail() {
        await this.send('passwordReset', 'Wave Finance - Complete your password reset request (valid for 10 mins)');
    }  
};

export default EmailService;
