import db from './src/db/models/index.js'
import UserLogin from './src/services/user/userLogin.service.js'

async function test() {
  try {
    const res = await UserLogin.execute({ email: 'admin@novacare.com', password: 'Admin@123' })
    console.log("Login Result:", res)
  } catch (err) {
    console.error("Fatal Error:", err)
  }
}
test()
