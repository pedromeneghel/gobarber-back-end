import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async show({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
