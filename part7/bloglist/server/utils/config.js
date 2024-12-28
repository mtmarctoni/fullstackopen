require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGO_DB_URI =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGO_DB_URI
        : process.env.MONGO_DB_URI

console.log(MONGO_DB_URI)

module.exports = {
    PORT,
    MONGO_DB_URI,
}
