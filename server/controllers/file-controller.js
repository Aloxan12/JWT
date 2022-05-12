const postService = require('../service/post-service')
const PostDto = require('../dtos/post-dto')
const multer = require("multer");
const ImageModel = require("../models/image-model");

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('testImage')


class FileController {
    async createPosts(req, res, next) {
        try {
            const {postText, author, publicDate} = req.body

            const post = await postService.createPosts(postText, author, publicDate)

            return res.json(post)
        } catch (e) {
            next(e)
        }
    }

    async uploadFile(req, res, next) {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    const newImage = new ImageModel({
                        name: req.body.name,
                        image: {
                            data: req.file.filename,
                            contentType: req.file.mimetype
                        }
                    })
                    await newImage.save()
                        .then(() => res.send('файл успешно загружен'))
                        .catch(err => console.log(err))
                }
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController()