const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const userSchema = mongoose.Schema({
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

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = await jsonwebtoken.sign({id: user._id.toString()}, 'estoessupersecreto', {expiresIn: '7 days'})
    return token
}

userSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Datos no válidos')
    }
    const isOk = await bcrypt.compare(password, user.password)
    if(!isOk){
        throw new Error('Datos no válidos')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User