const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        port = process.env.PORT || 3200
 
const handler = require('./controller/test') 
User = require("./models/user")
        
app.set("port", port);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin","X-Requested-With", "Content-Type", "Accept"
    )
    res.set("Content-Type", "application/json")
    next();
    });        

app.get('/', (req, res) => res.send("Go"))
app.post('/signin', (req, res) => {
    User.findOne({phone_number: req.body.user, password: req.body.pass})
            .then(data => {
                if (data) {
                    res.send({status: true, user: data})
                } else {
                    res.send({status: false, message: "User was not found. Please check the phone number again."})
                }
            })
            .catch(err => res.send({status: '400', message: "Error"}))
})
// handler.checkIfUserExist
app.post('/addTask', handler.addNewTask)
               
app.listen(port)
console.log(`Server Running On Port ${port}`)
    