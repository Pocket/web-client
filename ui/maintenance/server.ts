import express from 'express'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('This is a test web page!')
})

app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
