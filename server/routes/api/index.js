const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointments')

router.get('/appointments', appointmentController.all);
router.post('/appointmentCreate', appointmentController.create);




module.exports = router;
