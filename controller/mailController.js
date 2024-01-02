const nodemailer = require("nodemailer");

const mailSender = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const course = req.body.select;
  console.log(course);
  const msg = req.body.msg;
  // transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "leila.emard@ethereal.email",
      pass: "uje1CmxWnWysndnRF8",
    },
  });

  // mailoption
  const mailoption = {
    from: "leila.emard@ethereal.email",
    to: req.body.email,
    cc: "leila.emard@ethereal.email",
    subject: " Mr./Mrs." + name + " want to contact with BAOIAM",
    text:
      "<b>Name:</b>" +
      name +
      "\n\n" +
      "Contact no.: " +
      number +
      "\n\n" +
      "Email: " +
      email +
      "\n\n" +
      "Select Course: " +
      course +
      "\n\n" +
      "User query or message: " +
      msg,
  };

  transporter.sendMail(mailoption, (error, info) => {
    if (error) {
      res
        .status(401)
        .json({ err: "Cannot able to send message right mow,try again" });
    } else {
      res.status(200).json({ msg: "mail send successfully" });
    }
  });
};

module.exports = { mailSender };
