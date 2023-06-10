import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv'
dotenv.config()

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
    },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
});

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    var linkedIn = "https://www.linkedin.com/in/jamil-ahmed-54655220b/";
    var github = "https://github.com/jamilahmed2";
    // body
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to our joonah tech!',
            outro: `Need help or have a question? Contact me on </br> <b>LinkedIn:</b> <a>${linkedIn}</a> </br> <b>GitHub:</b> <a>${github}</a>`
        }
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully!",
        html: emailBody,
    };

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "Email Sent Successfully!" });
        })
        .catch(error => res.status(500).send({ error }));
};
