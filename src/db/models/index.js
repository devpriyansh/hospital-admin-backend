import Sequelize from 'sequelize'
import * as databaseConfig from '../../configs/database.config.js'

import UserModel from './users.model.js'
import UserSessionModel from './userSession.model.js'
import ServiceModel from './service.model.js'
import DoctorModel from './doctor.model.js'
import DoctorScheduleModel from './doctorSchedule.model.js'
import ConditionModel from './condition.model.js'
import AppointmentModel from './appointment.model.js'
import TestimonialModel from './testimonial.model.js'
import SiteConfigModel from './siteConfig.model.js'

const env = process.env.NODE_ENV || 'development'
const config = databaseConfig[env]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

// Register models
const db = {}
db.User = UserModel(sequelize, Sequelize.DataTypes)
db.UserSession = UserSessionModel(sequelize, Sequelize.DataTypes)
db.Service = ServiceModel(sequelize, Sequelize.DataTypes)
db.Doctor = DoctorModel(sequelize, Sequelize.DataTypes)
db.DoctorSchedule = DoctorScheduleModel(sequelize, Sequelize.DataTypes)
db.Condition = ConditionModel(sequelize, Sequelize.DataTypes)
db.Appointment = AppointmentModel(sequelize, Sequelize.DataTypes)
db.Testimonial = TestimonialModel(sequelize, Sequelize.DataTypes)
db.SiteConfig = SiteConfigModel(sequelize, Sequelize.DataTypes)

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { sequelize, Sequelize }
export default db
