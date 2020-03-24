const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slot_time: String,
  slot_date: String,
  created_at: Date,
  confirmation_code: String,
  confirmed: Boolean
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = {
  Appointment
};
