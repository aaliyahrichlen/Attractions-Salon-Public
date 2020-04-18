const async = require('async');
const crypto = require('crypto');
const Axios = require('axios');
const squareConnect = require('square-connect');
const {Appointment} = require('../models/index');
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



