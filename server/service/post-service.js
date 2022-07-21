const PostModel = require('../models/post-model')
const ApiError = require("../exeptions/api-error");
const PostDto = require("../dtos/post-dto");
const mongodb = require("mongodb");
require('dotenv').config()


class PostService{
    async getAllPosts(search, limit, page){
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        const posts = await PostModel.find()
        const filterPosts = posts.filter(post => {
            return !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true
        }).reverse()

        return {
            count: filterPosts.length,
            results: filterPosts.map((post)=> ({
                id: post._id,
                postText: post.postText,
                publicDate: post.publicDate,
                author: post.author,
            })).slice(offset,offset + limit)
        }
        // return posts
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
    async deletePost(id){
        const post = await PostModel.deleteOne({_id: new mongodb.ObjectId(id)})

        return {status: 204, message:'Пост успешно удален', post}
    }
}

module.exports = new PostService();