const bodyParser = require('body-parser')
const urlencoderParser = bodyParser.urlencoded({extended: false})
const mongoose = require('mongoose')

// Connect to the database
mongoose.connect('mongodb+srv://admin:031296@todo.4zmofec.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if(err) throw err;
    console.log('Connect is successfully')
})

// Create a schema
var todoSchema = new mongoose.Schema({
    item: {type:String}
})

// Create a model
const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = function (app){
    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        TodoModel.find({}, function (err, data){
            if(err) throw err;
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencoderParser, (req, res) => {
        // get data from view and add it to mongodb
        var newTodo = TodoModel(req.body).save(function (err,data){
            if(err) throw err;
            res.json(data)
        })
    })

    app.delete('/todo/:item' , function (req, res) {
        // delete the requested item from mongodb
        TodoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err,data){
            if(err) throw err;
            res.json(data);
        })

    });
}
