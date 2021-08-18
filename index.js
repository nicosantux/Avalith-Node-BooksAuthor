const express = require('express')
const app = express()
const PORT = 4000

// read and parse body
app.use(express.json())

// routes
app.use('/', require('./routes/book'))
app.use('/', require('./routes/author'))

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
