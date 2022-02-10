const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')

class UserService{
    async registration (email, password){
        const candidate = UserModel.findOne({email})
        if(candidate){
            throw new Error(`Пользователь с таким почтовым адресом - ${email}  уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = UserModel.create({email, password: hashPassword})
    }
}

module.exports = new UserService();