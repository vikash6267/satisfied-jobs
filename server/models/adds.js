const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    }
});



module.exports = mongoose.model('Add', adSchema);

