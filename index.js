require('dotenv').config();
const express = require('express');
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser');
const cors = require('cors')

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const user = process.env.MY_EMAIL;
const pass = process.env.MY_PASSWORD;

const transporter = nodeMailer.createTransport({
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,
     auth: {
          user: user,
          pass: pass,
     },
})

app.post("/sendMail", (req, res) => {
     const {name, email, subject, message} = req.body;
     const mailOptions = {
          from:`${name}<${email}>`,
          to: user,
          subject: `Message from ${email}: ${subject}`,
          text: message,
     }

    transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
               console.log(err);
               res.status(400).json("Error sending email");
          } else {
               console.log("Email sent successfully");
               res.status(200).json("Email sent successfully");
          }
     });
})

app.listen(port, console.log(`Server running on port: ${port}`));