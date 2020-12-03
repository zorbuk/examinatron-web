const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email incorrecto pana');
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
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

User.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = User