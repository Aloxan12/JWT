const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    message: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    publicDate: {type: Date, required: true},
}, {collection : 'posts' })

module.exports = model('Post', PostSchema)