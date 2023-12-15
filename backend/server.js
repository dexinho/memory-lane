const express = require('express')
const app = express()

const PORT = 3000
const host = 'localhost'

app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`)
})

