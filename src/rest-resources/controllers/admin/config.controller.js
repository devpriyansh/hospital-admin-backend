import db from '../../../db/models/index.js'

export default class AdminConfigController {
  // GET /api/admin/config
  static async get(req, res, next) {
    try {
      let config = await db.SiteConfig.findOne()
      if (!config) {
        // Fallback to default if not seeded
        config = await db.SiteConfig.create({
          address: '123 Health Ave, Medical City, MC 10001',
          phone: '+1 (555) 123-4567',
          email: 'contact@novacare.com',
          facebookUrl: '',
          twitterUrl: '',
          instagramUrl: '',
          linkedinUrl: ''
        })
      }
      return res.status(200).json({ success: true, data: config })
    } catch (error) {
      next(error)
    }
  }

  // PUT /api/admin/config
  static async update(req, res, next) {
    try {
      const payload = req.body
      let config = await db.SiteConfig.findOne()
      if (!config) {
        config = await db.SiteConfig.create(payload)
      } else {
        await config.update(payload)
      }
      return res.status(200).json({ success: true, data: config })
    } catch (error) {
      next(error)
    }
  }
}
