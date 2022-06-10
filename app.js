const express = require('express')
const todoController = require('./controllers/todoController')

const app = express()

const PORT = process.env.PORT || 80

DATABASE_URL='postgres://localhost/foobar'
HTTP_TIMEOUT=10000

app.set('view engine', 'ejs')
app.use(express.static('./public'))


todoController(app)

app.listen(PORT, () => {
    console.log('Server is listening 80')
})