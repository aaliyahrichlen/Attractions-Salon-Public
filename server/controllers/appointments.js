const Model = require('../models/index');
const {Appointment} = Model;
const twilio_creds = require('../config/config').sms
const accountSid = twilio_creds.sid;
const authToken = twilio_creds.auth_token;
const client = require('twilio')(accountSid, authToken);
var moment = require('moment')

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
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

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .exec((err, appointment) => res.json(appointment));
        
        let msgBody = requestBody.name + " this message is to confirm your appointment on " + moment(requestBody.slot_date).format("MMMM Do YYYY [at] h:mm a'");
        if(requestBody.stylist)
        {
          msgBody += " with " + requestBody.stylist;
        }
        client.messages
          .create({
            body: msgBody,
            from: twilio_creds.tx_phone_num,
            to: twilio_creds.rx_phone_num
          });
    });
  }
};

module.exports = appointmentController;
