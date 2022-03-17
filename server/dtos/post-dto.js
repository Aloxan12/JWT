module.exports = class PostDto {
    message;
    author;
    publicDate;
    id;

    constructor(model) {
        this.message = model.message
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
    }
}