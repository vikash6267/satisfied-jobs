const env = require("dotenv");
env.config({ path: "./.env" });
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const ErrorHandler = require("./ErrorHandlers");

let sendmailActication = async (res, next, email, subject, template, data) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        // auth: {
        //   user: process.env.MAIL_EMAIL_ADDRESS,
        //   pass:  process.env.MAIL_EMAIL_PASSWORD,
        // },
        auth: {
            user: "satisfiedjob4u@gmail.com",
            // user: "rishimaheshwari040@gmail.com",
            pass: "ehog gojy pfil inuc",
            // pass: "nkoq nazx fbby kurf",
        },
    });
    console.log("called")


    const templatePath = path.join(__dirname, "../mails", template);

    const html = await ejs.renderFile(templatePath, data)

    const mailOption = {
        from: "LMG Pvt. Ltd.",
        to: email,
        subject,
        html
    };


    transport.sendMail(mailOption, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500))
        console.log("jo")
        return
        // res.status(200).json({
        //     succcess: true,
        //     message:"successfully send mail pleas check your Mail",
        // })
    })
}

module.exports = sendmailActication;

