import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Pedroca Peçoca',
      email: 'email@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('email@exemplo.com');
  });

  it('should not be able to create a new user with same e-mail another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Pedroca Peçoca',
      email: 'email@exemplo.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Pedroca Peçoca',
        email: 'email@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
