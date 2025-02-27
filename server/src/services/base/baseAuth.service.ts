import { IUserResponse } from '../../interfaces';

export abstract class BaseAuthService {
  protected userDTO(user: IUserResponse): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
