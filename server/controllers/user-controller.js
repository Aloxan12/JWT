const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exeptions/api-error')
const {uuid} = require("uuid");
const path = require("path");
const multer = require("multer");
const ImageModel = require("../models/image-model");


const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadAvatar = multer({
    storage: Storage
}).single('avatar')


class UserController{
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, role} = req.body
            const userData = await userService.registration(email, password, role)

            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.setHeader('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)

            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.setHeader('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async logout(req, res, next){
        try {
            //const {refreshToken} = req.cookies
            const {refreshtoken} = req.headers

            const token = await userService.logout(refreshtoken)
            res.removeHeader('refreshToken')
            return res.json(token)
        }catch (e){
            next(e)
        }
    }
    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }catch (e){
            next(e)
        }
    }
    async refresh(req, res, next){
        try {
            // const {refreshToken} = req.cookies
            const {refreshtoken} = req.headers

            const userData = await userService.refresh(refreshtoken)

            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.setHeader('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async getUsers(req, res, next){
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        }catch (e){
            next(e)
        }
    }

    async uploadUserAvatar(req, res, next){
        try {
            uploadAvatar(req, res, async (err) => {
                const {id} = req.params
                console.log('req.files',req.file)
                const {originalname} = req.file
                let avatarName = Date.now() + '.jpg'
                avatar.mv(path.resolve(__dirname, '..', 'uploads', avatarName))
                const user = await userService.uploadUserAvatar(id, avatarName)
                return res.json(user)
            })
        }catch (e){
            next(e)
        }
    }
}

module.exports = new UserController()