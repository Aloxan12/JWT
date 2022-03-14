const PostModel = require('../models/post-model')
require('dotenv').config()


class PostService{
    async getAllPosts(){
        const posts = await PostModel.find()
        return posts
    }
}

module.exports = new PostService();