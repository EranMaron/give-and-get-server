const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        port = process.env.PORT || 3200
 
const handler = require('./controller/test') 
        
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

// app.get('/', (req, res) => res.send("Go"))
app.post('/signin', handler.checkIfUserExist)
app.post('/addTask', handler.addNewTask)
app.post('/signup', handler.addNewuser)
               
app.listen(port)
console.log(`Server Running On Port ${port}`)
