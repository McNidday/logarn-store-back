const mongoose = require('mongoose')
const schema = mongoose.Schema
const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'Grit'
    },
    imageurl: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    vendor: {
        type: String,
        required: true,
        default: 'Any'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)