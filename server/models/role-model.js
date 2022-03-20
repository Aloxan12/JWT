const {Schema, model} = require('mongoose')

const RoleModel = new Schema({
    value: {type: String, unique: true, default: "USER"},
}, {collection : 'roles' })

module.exports = model('Role', RoleModel)