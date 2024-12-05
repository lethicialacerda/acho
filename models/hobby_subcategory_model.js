const mongoose = require('mongoose')

const Hobby_subcategory_schema = new mongoose.Schema( {
    icon_hobby: {type: String},
    name: {type: String, required: true}
})

const Hobby_subcategory = mongoose.model('Hobby_subcategory', Hobby_subcategory_schema);
module.exports = Hobby_subcategory;