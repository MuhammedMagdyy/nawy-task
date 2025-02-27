import { Prisma } from '@prisma/client';
import { userRepository, UserRepository } from '../repositories';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    return this.userRepository.createOne(data);
  }

  async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.userRepository.findOne(where);
  }

  async findUserByEmail(email: string) {
    return this.findUser({ email });
  }
}

export const userService = new UserService(userRepository);
