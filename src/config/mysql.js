const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pos_app',
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('you are connected...')
})
module.exports = connection
