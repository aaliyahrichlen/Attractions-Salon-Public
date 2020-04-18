const {Appointment} = require('../models/index');
const client = require('twilio')(process.env.SMS_SID || require('../config/config').sms.sid, process.env.SMS_AUTH_TOKEN || require('../config/config').sms.auth_token);
const moment = require('moment-timezone')
const randomstring = require('randomstring')
const async = require('async')
const {transporter} =  require('./../models/email')

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  pastAppointments(req, res) {
    // Returns past appointments for a user
     Appointment.find({email: req.body.email}).exec((err, appointments) => res.json(appointments));
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
        
        let msgBody = 'Brandi,\n' + requestBody.name + " is requesting an appointment on " + moment(requestBody.slot_date).tz('America/New_York').format("MMMM Do YYYY [at] h:mm a");
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
        msgBody += '\n\nPlease click here to confirm this appointment: ' +  (process.env.WEB_URL || 'http://localhost:6163') + '/api/confirm/' + saved.confirmation_code
        msgBody += '\n\nPlease click here to ask the client to reschedule for a different time: ' + (process.env.WEB_URL || 'http://localhost:3000') + '/appt-range/' + saved.confirmation_code
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
          to: process.env.EMAIL_RX_ADDRESS || require('../config/config').email.rx_address,
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
    Appointment.findOneAndUpdate({ confirmation_code: req.params.confirmId, confirmed: false }, { confirmed: true }).exec((err, appointment) => {
        if(appointment)
        {
          if(process.env.WEB_URL)
          {
            res.redirect('../../confirm');
          }else{
            res.redirect('http://localhost:3000/Confirm');
          }
          let msg = appointment.name + ',\nYour appointment on ' + moment(appointment.slot_date).tz('America/New_York').format("MMMM Do YYYY [at] h:mm a");
          if(appointment.stylist)
          {
            msg += " with the stylist " + appointment.stylist;
          }else{
            msg += " with no preferred stylist"
          }
          msg += ' has been confirmed by the salon owner. We look forward to your appointment!';
          let emailOptions = {
            from: transporter.options.auth.user,
            to: appointment.email,
            subject: 'Attractions Salon Appointment Confirmation',
            text: msg
          };
          transporter.sendMail(emailOptions, function(error, info){
            if (error) {
              console.error(error);
            }
          });
        }else{
          Appointment.findOne({ confirmation_code: req.params.confirmId }).exec((err, new_appointment) => {
            if(new_appointment)
            {
              if(process.env.WEB_URL)
              {
                res.redirect('../../confirmedalready');
              }else{
                res.redirect('http://localhost:3000/ConfirmedAlready');
              }
            }else{
              if(process.env.WEB_URL)
              {
                res.redirect('../../actionfailed');
              }else{
                res.redirect('http://localhost:3000/ActionFailed');
              }
            }
          });
        }
      });
  },
  range(req, res) {
    var requestBody = req.body;
    Appointment.findOne({ confirmation_code: req.params.confirmId, confirmed: false }).exec((err, appointment) => {
      if(appointment)
        {
          res.send('OK');
          let msg = appointment.name + ',\nYour appointment on ' + moment(appointment.slot_date).tz('America/New_York').format("MMMM Do YYYY [at] h:mm a");
          if(appointment.stylist)
          {
            msg += " with the stylist " + appointment.stylist;
          }else{
            msg += " with no preferred stylist";
          }
          msg += ' is not available at your selected time. Please see the below times for available appointments on the same day, or please make a new appointment on the website if none of these times work for you.';
          msg += '\n\nAvailable Time Ranges:';
          requestBody.forEach(element => {
            msg += '\n' + moment(element.startTime).format("h:mm a") + ' to ' + moment(element.endTime).format("h:mm a")
          });
          msg += '\n\nPlease click this link to choose a new time for your appointment on the same day as the original appointment at a time within the above ranges: ';
          msg += (process.env.WEB_URL || 'http://localhost:3000') + '/new-appt-time/' + req.params.confirmId;
          msg += '\nOr, if you would like to reschedule on a different day altogether, please click this link: ';
          msg += (process.env.WEB_URL || 'http://localhost:3000') + '/appointments';
          msg += '\n\nWe look forward to your appointment!'
          let emailOptions = {
            from: transporter.options.auth.user,
            to: appointment.email,
            subject: 'Attractions Salon Appointment Reschedule',
            text: msg
          };
          transporter.sendMail(emailOptions, function(error, info){
            if (error) {
              console.error(error);
            }
          });
        }else{
          Appointment.findOne({ confirmation_code: req.params.confirmId }).exec((err, new_appointment) => {
            if(new_appointment)
            {
              res.send('CONFIRMED ALREADY');
            }else{
              res.send('ACTION FAILED');
            }
          });
        }
    });
  },
  time(req, res) {
    var requestBody = req.body;
    Appointment.findOne({ confirmation_code: req.params.confirmId, confirmed: false }).exec((err, appointment) => {
      if(appointment)
        {
          let newDate = moment(moment(appointment.slot_date).tz('America/New_York').format("MM/DD/YYYY") + ' ' + moment(requestBody.date).format('HH:mm a'), "MM/DD/YYYY HH:mm a").tz('America/New_York').toDate();
          Appointment.findOneAndUpdate({ confirmation_code: req.params.confirmId, confirmed: false }, {slot_date: newDate}, {new: true}).exec((error, saved) => {
            if(saved)
            {
              res.send('OK');
              let msgBody = 'Brandi,\n' + saved.name + " is requesting to change their appointment on " + moment(saved.slot_date).tz('America/New_York').format("MMMM Do YYYY [to] h:mm a");
              if(saved.stylist)
              {
                msgBody += " with the stylist " + saved.stylist;
              }else{
                msgBody += " with no preferred stylist"
              }
              msgBody += '.\n';
              //Add client info
              msgBody += '\nClient Email: ' + saved.email;
              msgBody += '\nClient Phone Number: ' + saved.phone;
              //Add confirmation link
              msgBody += '\n\nPlease click here to confirm this appointment: ' +  (process.env.WEB_URL || 'http://localhost:6163') + '/api/confirm/' + saved.confirmation_code
              msgBody += '\n\nPlease click here to ask the client to reschedule for a different time: ' + (process.env.WEB_URL || 'http://localhost:3000') + '/appt-range/' + saved.confirmation_code
              //Send email
              let emailOptions = {
                from: transporter.options.auth.user,
                to: process.env.EMAIL_RX_ADDRESS || require('../config/config').email.rx_address,
                subject: 'Attractions Salon Appointment Confirmation',
                text: msgBody
              };
              transporter.sendMail(emailOptions, function(error, info){
                if (error) {
                  console.error(error);
                }
              });
            }else{
              Appointment.findOne({ confirmation_code: req.params.confirmId }).exec((err, new_appointment) => {
                if(new_appointment)
                {
                  res.send('CONFIRMED ALREADY');
                }else{
                  res.send('ACTION FAILED');
                }
              });
            }
          });
        }else{
          Appointment.findOne({ confirmation_code: req.params.confirmId }).exec((err, new_appointment) => {
            if(new_appointment)
            {
              res.send('CONFIRMED ALREADY');
            }else{
              res.send('ACTION FAILED');
            }
          });
        }
    });
  }
};

module.exports = appointmentController;
