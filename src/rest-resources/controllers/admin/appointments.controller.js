import db from '../../../db/models/index.js'
import { Op } from 'sequelize'

export default class AdminAppointmentsController {
  // GET /api/admin/appointments
  static async list(req, res, next) {
    try {
      const { status, doctorId, page = 1, limit = 10, startDate, endDate } = req.query
      
      const whereClause = {}
      if (status) whereClause.status = status
      if (doctorId) whereClause.doctorId = doctorId
      
      if (startDate && endDate) {
        whereClause.appointmentDate = {
          [Op.between]: [startDate, endDate]
        }
      } else if (startDate) {
        whereClause.appointmentDate = { [Op.gte]: startDate }
      } else if (endDate) {
        whereClause.appointmentDate = { [Op.lte]: endDate }
      }
      
      const offset = (page - 1) * limit
      
      const { count, rows } = await db.Appointment.findAndCountAll({
        where: whereClause,
        include: [
          { model: db.Doctor, as: 'doctor', attributes: ['id', 'name', 'specialty'] }
        ],
        order: [['appointmentDate', 'DESC'], ['appointmentTime', 'DESC']],
        limit: Number(limit),
        offset: Number(offset)
      })

      return res.status(200).json({
        success: true,
        data: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / limit),
          appointments: rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  // GET /api/admin/appointments/:id
  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const appointment = await db.Appointment.findByPk(id, {
        include: [
          { model: db.Doctor, as: 'doctor' }
        ]
      })
      if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })
      
      return res.status(200).json({ success: true, data: appointment })
    } catch (error) {
      next(error)
    }
  }

  // PATCH /api/admin/appointments/:id/status
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body
      
      const appointment = await db.Appointment.findByPk(id)
      if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })
      
      await appointment.update({ status })
      return res.status(200).json({ success: true, data: appointment })
    } catch (error) {
      next(error)
    }
  }
}
