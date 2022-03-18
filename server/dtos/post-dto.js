module.exports = class PostDto {
    postText;
    author;
    publicDate;
    id;

    constructor(model) {
        this.postText = model.postText
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
    }
}