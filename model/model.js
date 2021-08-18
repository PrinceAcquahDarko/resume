const mongoose = require('mongoose');
const {Schema} = mongoose

const userModel = new Schema ({
    fullname: {type: String},
    email: {type: String},
    content: {type: String}
})

module.exports = mongoose.model('User', userModel)