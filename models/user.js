const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email incorrecto pana');
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('La password no puede ser password.');
            }
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value){
            if(!value < 0){
                throw new Error('Edad inferior a 0.');
            }
        }
    },
})


module.exports = User