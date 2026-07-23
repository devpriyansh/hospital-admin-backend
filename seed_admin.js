import bcrypt from 'bcrypt'
import db, { sequelize } from './src/db/models/index.js'

async function seedAdmin() {
  try {
    console.log('Connecting to database...')
    await sequelize.authenticate()
    console.log('Synchronizing User tables...')
    await db.User.sync({ alter: true })
    await db.UserSession.sync({ alter: true })

    const email = 'admin@novacare.com'
    const password = 'Admin@123'
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(`Checking if admin user ${email} exists...`)
    let adminUser = await db.User.findOne({ where: { email } })

    if (!adminUser) {
      console.log('Admin user not found. Creating...')
      adminUser = await db.User.create({
        userName: 'admin',
        firstName: 'System',
        lastName: 'Admin',
        email: email,
        password: hashedPassword,
      })
      console.log('Admin user created successfully.')
    } else {
      console.log('Admin user already exists. Updating password...')
      adminUser.password = hashedPassword
      await adminUser.save()
      console.log('Admin user password updated.')
    }

    console.log('Seeding complete.')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin user:', error)
    process.exit(1)
  }
}

seedAdmin()
