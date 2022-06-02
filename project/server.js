var express = require('express');
var bodyParser = require('body-parser');
//our application
var app = express();
//creating an http server from application
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const { stringify } = require('querystring');

var dbUrl = 'mongodb+srv://un:pw@project-owtzo.mongodb.net/db_name?retryWrites=true&w=majority';

//adding static content
app.use(express.static(__dirname));
//declaring as a middleware
app.use(bodyParser.json());
//make url encorded objects from request be decorded
app.use(bodyParser.urlencoded({ extended: false }));

//mongoose model
var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {

    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save()
        .then(() => {
            console.log('messaged saved');
            return Message.findOne({ message: 'badword' });
        })
        .then(censored => {
            if (censored) {
                console.log('censored words found: ', censored);
                return Message.remove({ _id: censored.id });
            }
            io.emit('message', req.body);
            res.sendStatus(200);
        })
        .catch(err => {
            sendStatus(500);
        })
});

io.on('connection', (socket) => {
    console.log('a user connected');
})

mongoose.connect(dbUrl, (err) => {

    if (err)
        console.log('mongoose connection error: ' + err)
    else
        console.log('mongo db connection established')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
