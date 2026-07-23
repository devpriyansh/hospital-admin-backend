import express from 'express'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware.js'

import AdminDoctorsController from '../../../controllers/admin/doctors.controller.js'
import AdminServicesController from '../../../controllers/admin/services.controller.js'
import AdminConditionsController from '../../../controllers/admin/conditions.controller.js'
import AdminAppointmentsController from '../../../controllers/admin/appointments.controller.js'
import AdminTestimonialsController from '../../../controllers/admin/testimonials.controller.js'
import AdminConfigController from '../../../controllers/admin/config.controller.js'

const router = express.Router()

// All /api/admin routes must be authenticated (JWT)
router.use(isUserAuthenticated)

// Doctors
router.get('/doctors', AdminDoctorsController.list)
router.post('/doctors', AdminDoctorsController.create)
router.put('/doctors/:id', AdminDoctorsController.update)
router.delete('/doctors/:id', AdminDoctorsController.delete)
router.put('/doctors/:id/slots', AdminDoctorsController.updateSlots)

// Services
router.get('/services', AdminServicesController.list)
router.post('/services', AdminServicesController.create)
router.put('/services/:id', AdminServicesController.update)
router.delete('/services/:id', AdminServicesController.delete)

// Conditions
router.get('/conditions', AdminConditionsController.list)
router.post('/conditions', AdminConditionsController.create)
router.put('/conditions/:id', AdminConditionsController.update)
router.delete('/conditions/:id', AdminConditionsController.delete)

// Appointments
router.get('/appointments', AdminAppointmentsController.list)
router.get('/appointments/:id', AdminAppointmentsController.getById)
router.patch('/appointments/:id/status', AdminAppointmentsController.updateStatus)

// Testimonials
router.get('/testimonials', AdminTestimonialsController.list)
router.post('/testimonials', AdminTestimonialsController.create)
router.put('/testimonials/:id', AdminTestimonialsController.update)
router.delete('/testimonials/:id', AdminTestimonialsController.delete)

// Site Config
router.get('/config', AdminConfigController.get)
router.put('/config', AdminConfigController.update)

export default router
