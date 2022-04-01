const postService = require('../service/post-service')
const PostDto = require('../dtos/post-dto')

class PostController{
    async getPosts(req, res, next){
        try {
            const posts = await postService.getAllPosts()
            return res.json(posts)
        }catch (e){
            next(e)
        }
    }
    async createPosts(req, res, next){
        try {
            const {postText, author, publicDate} = req.body

            const post = await postService.createPosts(postText, author, publicDate)

            return res.json(post)
        }catch (e){
            next(e)
        }
    }
    async deletePost(req, res, next){
        try {
            // const {id} = req.body
            const {id} = req.params
            console.log('id', id)

            const post = await postService.deletePost(id)

            return res.json(post)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new PostController()