const {Appointment} = require('../models/index');
const client = require('twilio')(process.env.SMS_SID || require('../config/config').sms.sid, process.env.SMS_AUTH_TOKEN || require('../config/config').sms.auth_token);
const moment = require('moment')
const randomstring = require('randomstring')
const async = require('async')
const {transporter} =  require('./../models/email')

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  async create(req, res) {
    var requestBody = req.body;
    
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      stylist: requestBody.stylist,
      slot_date: requestBody.slot_date,
      created_at: Date.now(),
      confirmed: false,
      confirmation_code: ''
    });

    //Create a confirmation code
    var codeExists = true;
    while(codeExists)
    {
      var new_confirmation_code = randomstring.generate(15)
      let apt = await Appointment.find({confirmation_code: new_confirmation_code})
        if(!apt.length)
        {
          newappointment.confirmation_code = new_confirmation_code;
          codeExists = false;
        }
    }
    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .exec((err, appointment) => res.json(appointment));
        
        let msgBody = 'Brandi,\n' + requestBody.name + " is requesting an appointment on " + moment(requestBody.slot_date).format("MMMM Do YYYY [at] h:mm a");
        if(requestBody.stylist)
        {
          msgBody += " with the stylist " + requestBody.stylist;
        }else{
          msgBody += " with no preferred stylist"
        }
        msgBody += '.\n';
        //Add client info
        msgBody += '\nClient Email: ' + saved.email;
        msgBody += '\nClient Phone Number: ' + saved.phone;
        //Add confirmation link
        msgBody += '\n\nPlease click here to confirm this appointment: ' +  (process.env.WEB_URL || 'http://localhost') + ':' + (process.env.PORT || 6163) + '/api/confirm/' + saved.confirmation_code
        //Send twilio 
        client.messages
          .create({
            body: msgBody,
            from: process.env.SMS_TX_PHONE_NUM || require('../config/config').sms.tx_phone_num,
            to: process.env.SMS_RX_PHONE_NUM || require('../config/config').sms.rx_phone_num
          })
        //Send email
        let emailOptions = {
          from: transporter.options.auth.user,
          to: saved.email,
          subject: 'Attractions Salon Appointment Confirmation',
          text: msgBody
        };
        transporter.sendMail(emailOptions, function(error, info){
          if (error) {
            console.error(error);
          }
        });
    });
  },
  confirm(req, res) {
    Appointment.findOne({ confirmation_code: req.params.confirmId }).exec((err, appointment) => {
        if(appointment)
        {
          appointment.confirmed = true;
          res.json("Confirmed")
        }else{
          res.json("Failed to Confirm")
        }
      });
  }
};

module.exports = appointmentController;
