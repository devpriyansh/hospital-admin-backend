import db from '../../../db/models/index.js'
import { Op } from 'sequelize'

export default class AdminDoctorsController {
  // GET /api/admin/doctors
  static async list(req, res, next) {
    try {
      const { search, specialty, page = 1, limit = 10 } = req.query
      
      const whereClause = {}
      if (search) {
        whereClause.name = { [Op.iLike]: `%${search}%` }
      }
      if (specialty) {
        whereClause.specialty = specialty
      }
      
      const offset = (page - 1) * limit
      
      const { count, rows } = await db.Doctor.findAndCountAll({
        where: whereClause,
        include: [
          { model: db.Service, as: 'service', attributes: ['id', 'name'] }
        ],
        order: [['createdAt', 'DESC']],
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
          doctors: rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/admin/doctors
  static async create(req, res, next) {
    try {
      const payload = req.body
      const doctor = await db.Doctor.create(payload)
      return res.status(201).json({ success: true, data: doctor })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/doctors/:id
  static async update(req, res, next) {
    try {
      const { id } = req.params
      const payload = req.body
      const doctor = await db.Doctor.findByPk(id)
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })
      
      await doctor.update(payload)
      return res.status(200).json({ success: true, data: doctor })
    } catch (error) {
      next(error)
    }
  }

  // DELETE /api/admin/doctors/:id
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const doctor = await db.Doctor.findByPk(id)
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })
      
      // Soft delete
      await doctor.update({ isActive: false })
      return res.status(200).json({ success: true, message: 'Doctor deleted (deactivated)' })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/doctors/:id/slots
  static async updateSlots(req, res, next) {
    try {
      const { id } = req.params
      const { schedule } = req.body 

      const doctor = await db.Doctor.findByPk(id)
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })

      await doctor.update({ schedule })

      return res.status(200).json({ success: true, message: 'Doctor schedule updated' })
    } catch (error) {
      next(error)
    }
  }
}
