const {Schema, model} = require('mongoose')

const ImageSchema = new Schema({
    name: {type: String, required: true},
    image: {data: Buffer, contentType: String},
}, {collection : 'image' })

module.exports = model('Image', ImageSchema)