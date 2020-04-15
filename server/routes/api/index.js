const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointments')
const paymentController = require('../../controllers/payments')


router.get('/appointments', appointmentController.all);
router.post('/appointmentCreate', appointmentController.create);
router.get('/confirm/:confirmId', appointmentController.confirm);

router.post('/processPayment', paymentController.all);



module.exports = router;
