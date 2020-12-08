import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hasgProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id){
      throw new AppError('E-mail already in use.');
    }

    if(!old_password && password) {
      throw new AppError('You need to inform the old password to set a new password.');
    }

    if(password && old_password) {
      const checkOldPassword = await this.hasgProvider.compareHash(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hasgProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
