const nodemailer = require('nodemailer');
const email_creds = require('../config/config').email

var transporter = nodemailer.createTransport({
    service: email_creds.service,
    auth: {
      user: email_creds.user,
      pass: email_creds.pass
    }
  });

module.exports = {
    transporter
};