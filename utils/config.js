require('dotenv').config()

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
    PORT,
    DB_URI,
    DB_PASSWORD
}