import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvier';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  });

  it('should be able to update the profile', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@exemple.com'
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@exemple.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });

    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe2@exemple.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@exemple.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the password', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@exemple.com',
      password: '123123',
      old_password: '123456'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password with incorrect old password', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@exemple.com',
        old_password: 'wrong_old_password',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile user non-existing', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing',
        name: 'non-existing',
        email: 'johndoe@non-existing.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old password', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@exemple.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
