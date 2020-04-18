const async = require('async');
const crypto = require('crypto');
const Axios = require('axios');
const squareConnect = require('square-connect');
const {Appointment} = require('../models/index');
const {transporter} =  require('./../models/email')
const moment = require('moment-timezone')
const accessToken = 'EAAAEOqyykSOhYXZWUryBwfhIRzsUSRlbwP99rD12n01PEOS28IqspWo2n6qwiTX';
const defaultClient = squareConnect.ApiClient.instance;

defaultClient.basePath = 'https://connect.squareupsandbox.com';



const paymentController = {
    async all(req, res) {
      nonce = req.body.nonce;
      amount = req.body.amount;
      const idempotency_key = crypto.randomBytes(22).toString('hex');


      const oauth2 = defaultClient.authentications['oauth2'];
      oauth2.accessToken = accessToken;

      const payments_api = new squareConnect.PaymentsApi();
      const request_body = {
        source_id: nonce,
        amount_money: {
          amount: amount,
          currency: 'USD'
        },
        idempotency_key: idempotency_key
      };

      try {
        const response = await payments_api.createPayment(request_body);
        console.log("success")
        Appointment.findOneAndUpdate({ confirmation_code: req.body.confirmation_code}, { paid: true }).exec((err, appointment) => {
          if(appointment)
          {
            let msgBody = 'Brandi,\n' + appointment.name + " has paid online for their appointment on " + moment(appointment.slot_date).tz('America/New_York').format("MMMM Do YYYY [to] h:mm a");
            if(appointment.stylist)
            {
              msgBody += " with the stylist " + appointment.stylist;
            }else{
              msgBody += " with no preferred stylist"
            }
            msgBody += " for a " + appointment.serviceName + ", which is priced at $" + (appointment.servicePrice / 100).toFixed(2);
            msgBody += '.\n';
            //Add client info
            msgBody += '\nClient Email: ' + appointment.email;
            msgBody += '\nClient Phone Number: ' + appointment.phone;
            //Send email
            let emailOptions = {
              from: transporter.options.auth.user,
              to: process.env.EMAIL_RX_ADDRESS || require('../config/config').email.rx_address,
              subject: 'Attractions Salon Appointment Payment Complete',
              text: msgBody
            };
            transporter.sendMail(emailOptions, function(error, info){
              if (error) {
                console.error(error);
              }
            });
            res.send("OK")
          }else{
            res.send("FAILURE")
          }
        });
      } catch(error) {
        console.log("failure")
        console.log(error)
        res.send("FAILURE")
      }
    }
}

module.exports = paymentController;



