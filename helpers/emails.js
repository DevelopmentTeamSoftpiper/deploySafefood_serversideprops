const nodeMailer = require("nodemailer");
 
exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'alarafatsiddique@gmail.com', // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: 'WjzOIJdxAtbYgBm6', // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
  });
 
  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        message: `Email has been sent to your email. Follow the instruction to activate your account`,
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
 