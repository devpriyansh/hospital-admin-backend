import db from '../../../db/models/index.js'
import { Op } from 'sequelize'

export default class AdminConditionsController {
  // GET /api/admin/conditions
  static async list(req, res, next) {
    try {
      const { serviceId } = req.query
      const whereClause = serviceId ? { serviceId } : {}
      
      const conditions = await db.Condition.findAll({
        where: whereClause,
        include: [
          { model: db.Service, as: 'service', attributes: ['id', 'name'] }
        ],
        order: [['name', 'ASC']]
      })
      
      return res.status(200).json({ success: true, data: conditions })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/admin/conditions
  static async create(req, res, next) {
    try {
      const payload = req.body
      const condition = await db.Condition.create(payload)
      return res.status(201).json({ success: true, data: condition })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/conditions/:id
  static async update(req, res, next) {
    try {
      const { id } = req.params
      const payload = req.body
      const condition = await db.Condition.findByPk(id)
      if (!condition) return res.status(404).json({ success: false, message: 'Condition not found' })
      
      await condition.update(payload)
      return res.status(200).json({ success: true, data: condition })
    } catch (error) {
      next(error)
    }
  }

  // DELETE /api/admin/conditions/:id
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const condition = await db.Condition.findByPk(id)
      if (!condition) return res.status(404).json({ success: false, message: 'Condition not found' })
      
      await condition.destroy()
      return res.status(200).json({ success: true, message: 'Condition deleted' })
    } catch (error) {
      next(error)
    }
  }
}
