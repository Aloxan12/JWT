const UserModel = require('../models/user-model')
const RoleModel = require('../models/role-model')
const bcrypt = require('bcrypt')
require('dotenv').config()
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/api-error')
const mongodb = require("mongodb");

class UserService{
    async registration (email, password, role){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом - ${email}  уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        // const userRole = await RoleModel.findOne({value: "USER"})
        const user = await UserModel.create({email, password: hashPassword, activationLink, role})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
    async login (email, password){
        const user = await UserModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData && !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers(search, limit, page){
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        const users = await UserModel.find()
        const filterUser = users.filter(user => {
            return !!search ? user.email.toLowerCase().includes(search.toLowerCase()) : true
        }).reverse()

        return {
            count: filterUser.length,
            results: filterUser.map((i)=> ({
                id: i._id,
                email: i.email,
                role: i.role,
                isActivated: i.isActivated,
                avatar: i.avatar
            })).slice(offset,offset + limit)
        }
    }

    async getUserDetail(id){
        const user = await UserModel.findOne({_id: new mongodb.ObjectId(id)})
        if(!!user){
            return {
                id: user._id,
                email: user.email,
                role: user.role,
                isActivated: user.isActivated,
                avatar: user.avatar,
                status: user.status
            }
        }else{
            throw ApiError.BadRequest('Пользователь не найден')
        }
    }

    async updateUserDetail(id, user){
        const currentUser = await UserModel.findOne({_id: new mongodb.ObjectId(id)})
        await currentUser.update({
            id: currentUser._id,
            email: currentUser.email,
            role: currentUser.role,
            isActivated: currentUser.isActivated,
            avatar: currentUser.avatar,
            status: !!user.status ? user.status : currentUser.status
        })
        if(!!currentUser){
            return {
                id: currentUser._id,
                email: currentUser.email,
                role: currentUser.role,
                isActivated: currentUser.isActivated,
                avatar: currentUser.avatar,
                status: !!user.status ? user.status : currentUser.status
            }
        }else{
            throw ApiError.BadRequest('Пользователь не найден')
        }
    }

    async uploadUserAvatar(id, avatar){
        try {
            const user = await UserModel.findOne({_id: new mongodb.ObjectId(id)})
            await user.update({
                id: user._id,
                email: user.email,
                role: user.role,
                isActivated: user.isActivated,
                avatar: avatar,
                status: user.status
            })

            return ({
                id: user._id,
                email: user.email,
                role: user.role,
                isActivated: user.isActivated,
                avatar: avatar,
                status: user.avatar
            })
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserService();