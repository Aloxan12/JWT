const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/api-error");
const path = require("path");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, role } = req.body;
      const userData = await userService.registration(email, password, role);

      res.setHeader("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      res.setHeader("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      //const {refreshToken} = req.cookies
      const { refreshtoken } = req.headers;

      const token = await userService.logout(refreshtoken);
      res.removeHeader("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshtoken } = req.headers;

      const userData = await userService.refresh(refreshtoken);

      res.setHeader("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { search, limit, page } = req.query;
      const usersData = await userService.getAllUsers(search, limit, page);
      return res.json(usersData);
    } catch (e) {
      next(e);
    }
  }

  async getUserDetail(req, res, next) {
    try {
      const { id } = req.params;

      const users = await userService.getUserDetail(id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async updateUserDetail(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.body;

      const users = await userService.updateUserDetail(id, user);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async uploadUserAvatar(req, res, next) {
    try {
      const { id } = req.params;
      const img = req.files.file;
      let avatarName = Date.now() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "uploads", avatarName));
      const user = await userService.uploadUserAvatar(id, avatarName);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
