const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointments')
const paymentController = require('../../controllers/payments')


router.get('/appointments', appointmentController.all);
router.post('/appointmentCreate', appointmentController.create);
router.get('/confirm/:confirmId', appointmentController.confirm);
router.post('/processPayment', paymentController.all);
router.post('/appointmentRange/:confirmId', appointmentController.range);
router.post('/appointmentTime/:confirmId', appointmentController.time);
router.post('/pastAppointments', appointmentController.pastAppointments);
router.post('/appointmentPrice', appointmentController.price);

module.exports = router;
