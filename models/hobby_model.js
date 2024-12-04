const mongoose = require('mongoose')

const Hobby_schema = new mongoose.Schema( {
    photo_hobby: {type: String, required: true},
    name: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hobby_category',
        required: true
    }
})

const Hobby = mongoose.model('Hobby', Hobby_schema);
module.exports = Hobby;