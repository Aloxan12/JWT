require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const multer = require('multer')

path = require('path')

const ImageModel = require('./models/image-model')
const UserModel = require("./models/user-model");

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(cookieParser())
app.use(cors({credential: true, origin: process.env.CLIENT_URL}));
app.use('/api', router)
app.use(errorMiddleware)

const upload = multer({
    storage: Storage
}).single('testImage')

app.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('loooog', req.file)
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: req.file.mimetype
                }
            })
            await newImage.save().then(() => res.send('файл успешно загружен')).catch(err => console.log(err))
        }
    })
})

app.get('/upload/:name', async (req, res)=>{
    const name = req.params.name
    const photo = await ImageModel.findOne({name})

    return res.json(path.resolve(__dirname, name))
})

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`connected port - ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()