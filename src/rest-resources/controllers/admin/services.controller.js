import db from '../../../db/models/index.js'
import { Op } from 'sequelize'

export default class AdminServicesController {
  // GET /api/admin/services
  static async list(req, res, next) {
    try {
      const services = await db.Service.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).json({ success: true, data: services })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/admin/services
  static async create(req, res, next) {
    try {
      const payload = req.body
      const service = await db.Service.create(payload)
      return res.status(201).json({ success: true, data: service })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/services/:id
  static async update(req, res, next) {
    try {
      const { id } = req.params
      const payload = req.body
      const service = await db.Service.findByPk(id)
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
      
      await service.update(payload)
      return res.status(200).json({ success: true, data: service })
    } catch (error) {
      next(error)
    }
  }

  // DELETE /api/admin/services/:id
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const service = await db.Service.findByPk(id)
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
      
      await service.destroy()
      return res.status(200).json({ success: true, message: 'Service deleted' })
    } catch (error) {
      next(error)
    }
  }
}
