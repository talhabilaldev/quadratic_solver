const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/quadratic_solutions',{
    useNewUrlParser : true
})

const quadraticSchema = new mongoose.Schema({
    A : {
        type : String,
        required : true
    },
    B : {
        type : String, 
        required : true
    },
    C : {
        type : String,
        required : true
    },
    Solution_1 : {
        type : String, 
        required : true
    },
    Solution_2 : {
        type : String, 
        required : true
    }
})

const Quadratics  = mongoose.model('Quadratics',quadraticSchema)


module.exports = Quadratics