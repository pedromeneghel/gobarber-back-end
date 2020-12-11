import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvier';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateIser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'email@exemplo.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'email@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'email@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with worng password', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'email@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    await expect(
      authenticateUser.execute({
        email: 'email@exemplo.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
