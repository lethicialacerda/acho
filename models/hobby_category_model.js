const mongoose = require('mongoose');

const Hobby_CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby_subcategory', required: true }
});

const Hobby_Category = mongoose.model('Hobby_Category', Hobby_CategorySchema);
module.exports = Hobby_Category;

