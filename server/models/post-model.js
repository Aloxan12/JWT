const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    message: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    publicDate: {type: Date, required: false},
}, {collection : 'posts' })

module.exports = model('Post', PostSchema)