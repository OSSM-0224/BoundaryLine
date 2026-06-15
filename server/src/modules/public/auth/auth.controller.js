import { app_config } from "../../../constant/app.constant.js";
import AuthService from "./auth.service.js";
import env from "../../../config/env.js";

export default class AuthController {
  constructor() {
    this.userService = new AuthService();
  }

  async GoogleCallback(req, res) {
    const config = app_config(env.NODE_ENV);
    const { accessToken, refreshToken } = await this.userService.CreateUser(
      req.user,
    );

    res.cookie("accessToken", accessToken, config.cookie.accessToken);
    res.cookie("refreshToken", refreshToken, config.cookie.refreshToken);

    res.redirect(env.REDIRECT_URL);
  }
}
