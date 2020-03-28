const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || require('../config/config').email.service,
    auth: {
      user: process.env.EMAIL_USER || require('../config/config').email.user,
      pass: process.env.EMAIL_PASS || require('../config/config').email.pass
    }
  });

module.exports = {
    transporter
};