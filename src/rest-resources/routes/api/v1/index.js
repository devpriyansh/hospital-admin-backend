import express from 'express'
import userRoutes from './user.routes.js'
import adminRoutes from './admin.routes.js'

const v1Router = express.Router()

v1Router.use('/user', userRoutes)
v1Router.use('/admin', adminRoutes)

export default v1Router
