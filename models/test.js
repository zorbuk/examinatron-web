const mongoose = require('mongoose')

const Test = mongoose.model('Test', {
    question: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true,
        answered : {
            type: Boolean,
            default: false,
            required: true
        }
    },
    answer2: {
        type: String,
        required: true,
        answered : {
            type: Boolean,
            default: false,
            required: true
        }
    },
    answer3: {
        type: String,
        required: true,
        answered : {
            type: Boolean,
            default: false,
            required: true
        }
    },
    answer4: {
        type: String,
        required: true,
        answered : {
            type: Boolean,
            default: false,
            required: true
        }
    },
})


module.exports = Test