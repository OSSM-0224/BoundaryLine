import UserRepo from "../../../repository/user.repository.js";
import NotFound from "../../../shared/error/NotFound.js";

export default class PrivateUserService {
  constructor(userRepo = new UserRepo()) {
    this.userRepo = userRepo;
  }

  async getUsers() {
    return this.userRepo.findAll();
  }

  async getUserById(userId) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async updateUser(userId, payload) {
    const user =
      await this.userRepo.updateById(
        userId,
        payload
      );

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async deleteUser(userId) {
    const user =
      await this.userRepo.softDeleteById(
        userId
      );

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }
}