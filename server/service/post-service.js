const PostModel = require('../models/post-model')
const ApiError = require("../exeptions/api-error");
const PostDto = require("../dtos/post-dto");
require('dotenv').config()


class PostService{
    async getAllPosts(){
        const posts = await PostModel.find()
        return posts
    }
    async createPosts(postText, author, publicDate){
        if(postText.length > 5000){
            throw ApiError.BadRequest(`Текст не олжен привышать 5000 символов`)
        }
        const post = await PostModel.create({postText, author, publicDate})
        const postDto = new PostDto(post)
        return {
            post: postDto
        }
    }
}

module.exports = new PostService();