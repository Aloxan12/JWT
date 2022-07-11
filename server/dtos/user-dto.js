module.exports = class UserDto {
    email;
    id;
    isActivated;
    role;
    avatar;
    status;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.role = model.role
        this.avatar = model.avatar
        this.status = model.status
    }
}