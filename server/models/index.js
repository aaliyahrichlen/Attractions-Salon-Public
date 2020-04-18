const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  stylist: String,
  slot_date: Date,
  created_at: Date,
  confirmation_code: String,
  confirmed: Boolean,
  serviceName: String,
  servicePrice: Number,
  paid: Boolean
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = {
  Appointment
};
