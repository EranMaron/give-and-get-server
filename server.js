const   express = require('express'),
        app = express(),
        port = process.env.PORT || 3200
 
const handler = require('./controller/test') 
        
app.set("port", port);

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin","X-Requested-With", "Content-Type", "Accept"
    )
    res.set("Content-Type", "application/json")
    next();
    });        

app.get('/', (req, res) => res.send('Root Route'))
app.post('/signin', (req, res) => res.send('hi Amit'))
app.post('/addTask', handler.addNewTask)
app.post('/signup', handler.addNewuser)
app.all('*', (req, res) => res.send("All Routes"))
               
app.listen(port)
console.log(`Server Running On Port ${port}`)
