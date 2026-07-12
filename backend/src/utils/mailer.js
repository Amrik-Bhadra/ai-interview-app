import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, emailContent }) => {
    // Transporter created here — inside the function, not at module load time
    // By the time this runs, dotenv.config() has already executed
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const emailOptions = {
        from: `"IntervueAI" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: emailContent,
    };

    await transporter.sendMail(emailOptions);
    return { success: true, message: "Email sent successfully!" };
};

export default sendEmail;