const db = require('mysql')

// db connection
const connection = db.createConnection({
  host: 'localhost',
  database: 'bookstore',
  user: 'root',
  password: '123456'
})

connection.connect((err) => {
  if (err) throw err

  console.log('DB connected')
})

module.exports = connection
