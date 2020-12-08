import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvier';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'email@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('email@exemplo.com');
  });

  it('should not be able to create a new user with same e-mail another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'email@exemplo.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Pedroca Peçoca',
        email: 'email@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
