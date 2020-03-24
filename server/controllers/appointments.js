const Model = require('../models/index');
const {Appointment} = Model;
const twilio_creds = require('../config/config').sms
const accountSid = twilio_creds.sid;
const authToken = twilio_creds.auth_token;
const client = require('twilio')(accountSid, authToken);

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
    var requestBody = req.body;

    // var newslot = new Slot({
    //   slot_time: requestBody.slot_time,
    //   slot_date: requestBody.slot_date,
    //   created_at: Date.now()
    // });
    // newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now(),
      confirmed: false
    });

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .exec((err, appointment) => res.json(appointment));

        client.messages
          .create({
            body: requestBody.name + " this message is to confirm your appointment at " + requestBody.slot_date,
            from: twilio_creds.tx_phone_num,
            to: twilio_creds.rx_phone_num
          });
    });
  }
};

module.exports = appointmentController;
