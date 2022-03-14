const postService = require('../service/post-service')

class PostController{
    async getPosts(req, res, next){
        try {
            const posts = await postService.getAllPosts()
            return res.json(posts)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new PostController()