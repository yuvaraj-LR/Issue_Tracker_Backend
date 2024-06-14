import nodemailer from "nodemailer"

export const sendWelcomeEmail = async(user) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASS
        }
    });

    const mailOption = {
        from: process.env.SMPT_MAIL,
        to: user.email,
        subject: `Welcome to ${process.env.PROJECT_NAME} application.`,
        html: `
        <h1>Welcome Mail</h1> \n \n
        <p>Thank you for registering into our webpage.</p>
        `
    }

    await transporter.sendMail(mailOption);
    console.log("<---------------------------Welcome Mail--------------------------->");
    console.log("Successfully send mail for welcome.");
}