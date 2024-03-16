import { Op } from "sequelize";
import User from "../../models/user";

class UserRepository {
    async createUser(firstName: string, lastName: string, email: string, username: string, password: string) {
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });
      
        return user;
    }

    async findByUsername(username: string) {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
    
      return user;
  }

    async updateUserResetToken(userId: number, token: string, expires: Date) {
        const updatedUser = await User.update(
          {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );
      
        return updatedUser;
    }

    async findByResetToken(email: string, token: string) {
        const user = await User.findOne({
          where: {
            email: email,
            resetPasswordToken: token,
            resetPasswordExpires: { [Op.gt]: new Date() },
          },
        });
      
        return user;
    }
    
      async updateUserPassword(userId: number, hashedPassword: string) {
        const updatedUser = await User.update(
          {
            password: hashedPassword,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );
      
        return updatedUser;
    }

    async clearUserResetToken(userId: number) {
        const updatedUser = await User.update(
          {
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );
      
        return updatedUser;
    }

    async getAllUsers(role: any, skip: any, perPage: any) {
      const query: any = {};
      if (role) {
        query.role = role;
      }
       
      const users = await User.findAll({
        where: query,
        offset: parseInt(skip, 10) || 0,
        limit: parseInt(perPage, 10) || undefined,
      });
    
      return users;
    }

    async getTotalUserCount(role: any) {
        const count = await User.count({
          where: {
            role: role,
          },
        });
      
        return count;
    }

    async getUserById(userId: number) {
        const user = await User.findByPk(userId);
      
        return user;
    }

    async updateMyProfile(userId: number, data: any) {
        const updatedUser = await User.update(
          {
            ...data,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );

        const [_numAffectedRows, [updatedData]] = updatedUser;
      
        return updatedData;
    }

    async findPasswordByUserId(userId: number) {
        const user = await User.findByPk(userId, {
          attributes: ['password'],
        });
      
        return user? user.password : null;
    }

    async findByIdAndDelete(userId: number) {
        const user = await User.destroy({
          where: {
            id: userId,
          },
        });
      
        return user;
    }

    async updateUser(userId: number, data: any) {
        const updatedUser = await User.update(
          {
            ...data,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );

        const [_numAffectedRows, [updatedData]] = updatedUser;
      
        return updatedData;
    }

    async updateUserRole(userId: number, role: any) {
        const updatedUserRole = await User.update(
          {
            role: role,
          },
          {
            where: { id: userId },
            returning: true,
          },
        );
      
        return updatedUserRole;
    }
}

export default UserRepository;
