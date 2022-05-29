const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const Quadratic_Schema = require('./schema')

const app = express()
const port = process.env.PORT || 3000

// define paths for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory path 
app.use(express.static(publicDirPath))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('', (req, res) => {
    res.render('index', {
        name: "Talha Bilal"
    })
})

app.get('/quadratic_calculate', async (req, res) => {
    var a = req.query.a
    var b = req.query.b
    var c = req.query.c

    let d = (b * b) - (4 * a * c)
    if (d > 0) {
        root1 = (-b + Math.sqrt(d)) / (2 * a)
        root2 = (-b - Math.sqrt(d)) / (2 * a)
    }
    else if (d == 0) {
        root1 = root2 = -b / (2 * a);
    }
    else {
        let real = (-b / (2 * a)).toFixed(2);
        let imaginary = (Math.sqrt(-d) / (2 * a)).toFixed(2);
        root1 = real + " + " + imaginary + "i"
        root2 = real + " - " + imaginary + "i"
    }
    var obj = new Quadratic_Schema({
        A: a,
        B: b,
        C: c,
        Solution_1: root1,
        Solution_2: root2
    })
    try {
        await obj.save()
        res.status(201).send(obj)
    } catch (e) {
        res.status(500).send({"error":"An error occurred."})
    }
})

app.get('/quadratic_retrieve', (req, res) => {
    try {
        Quadratic_Schema.find({},(err, data) => {
            if(err){
                res.status(500).send({"error" : "Could not connect to database."})
            }
            else{
                res.send(data)
            }
        })
    }
    catch (e) {
        res.status(500).send({"error" : "An error occurred"})
    }
})


app.listen(port, () => {
    console.log('Server is up on ' + port)
})
