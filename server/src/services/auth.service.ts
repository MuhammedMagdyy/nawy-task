import { ILoginUser, IRegisterUser } from '../interfaces';
import { HashingService, JwtService, userService } from '../services';
import { ApiError, CONFLICT, logger, UNAUTHORIZED } from '../utils';
import { BaseAuthService } from './base';

export class AuthService extends BaseAuthService {
  async register(userInfo: IRegisterUser) {
    try {
      const userExists = await userService.findUserByEmail(userInfo.email);

      if (userExists) {
        throw new ApiError('User already exists', CONFLICT);
      }

      const hashedPassword = await HashingService.hash(userInfo.password);
      const userCredentials = { ...userInfo, password: hashedPassword };

      const user = await userService.createUser(userCredentials);
      const tokens = await JwtService.generateTokens({ id: user.id });

      return { user: this.userDTO(user), tokens };
    } catch (error) {
      logger.error('Registration failed:', error);
      throw error;
    }
  }

  async login(userInfo: ILoginUser) {
    try {
      const currentUser = await userService.findUserByEmail(userInfo.email);
      if (!currentUser) {
        throw new ApiError('Invalid credintials', UNAUTHORIZED);
      }

      const isMatch = await HashingService.compare(
        userInfo.password,
        currentUser.password
      );

      if (!isMatch) {
        throw new ApiError('Invalid credintials', UNAUTHORIZED);
      }

      const tokens = await JwtService.generateTokens({ id: currentUser.id });

      return { user: this.userDTO(currentUser), tokens };
    } catch (error) {
      logger.error('Login failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
