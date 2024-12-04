const mongoose = require('mongoose')

const Hobby_category_schema = new mongoose.Schema( {
    icon_hobby: {type: String, required: true},
    name: {type: String, required: true}
})

const Hobby_categoria = mongoose.model('Hobby_categoria', Hobby_category_schema);
module.exports = Hobby_categoria;