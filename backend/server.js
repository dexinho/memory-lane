const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000
const host = 'localhost'

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`)
})

