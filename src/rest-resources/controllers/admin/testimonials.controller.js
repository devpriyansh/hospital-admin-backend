import db from '../../../db/models/index.js'

export default class AdminTestimonialsController {
  // GET /api/admin/testimonials
  static async list(req, res, next) {
    try {
      const testimonials = await db.Testimonial.findAll({
        order: [['createdAt', 'DESC']]
      })
      return res.status(200).json({ success: true, data: testimonials })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/admin/testimonials
  static async create(req, res, next) {
    try {
      const payload = req.body
      const testimonial = await db.Testimonial.create(payload)
      return res.status(201).json({ success: true, data: testimonial })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/testimonials/:id
  static async update(req, res, next) {
    try {
      const { id } = req.params
      const payload = req.body
      const testimonial = await db.Testimonial.findByPk(id)
      if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' })
      
      await testimonial.update(payload)
      return res.status(200).json({ success: true, data: testimonial })
    } catch (error) {
      next(error)
    }
  }

  // DELETE /api/admin/testimonials/:id
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const testimonial = await db.Testimonial.findByPk(id)
      if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' })
      
      await testimonial.destroy()
      return res.status(200).json({ success: true, message: 'Testimonial deleted' })
    } catch (error) {
      next(error)
    }
  }
}
