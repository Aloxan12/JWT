require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
// const router = require('router/index.js')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const multer = require('multer')

const ImageModel = require('./models/image-model')

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
        }
})

const upload = multer({
    storage: Storage
}).single('testStorage')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credential: true, origin: process.env.CLIENT_URL}));
app.use('/api', router)
app.use(errorMiddleware)


app.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err)
        }else{
            const newImage = new ImageModel({
                name: req.body.name,
                image:{
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newImage.save().then(()=> res.send('файл успешно загружен')).catch(err => console.log(err))
        }
    })
})

const startApp = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, ()=>console.log(`connected port - ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

startApp()