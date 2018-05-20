const functions = require('firebase-functions')

const nodemailer = require('nodemailer')
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="email-password"
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

exports.sendMail = functions.https.onRequest((req, res) => {
  var mailOptions = {
    to: 'centimitr@gmail.com',
    subject: 'Test Mail',
    html: 'Testing the Mail'
  }
  mailTransport.sendMail(mailOptions, function (err, response) {
    if (err) {
      res.end(err)
    }
    else {
      res.end('Mail sent')
    }
  })
})
