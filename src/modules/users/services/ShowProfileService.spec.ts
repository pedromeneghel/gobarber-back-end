import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
    )
  });

  it('should be able to show the profile', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const showUser = await showProfile.show({
      user_id: user.id
    });

    expect(showUser.name).toBe('John Doe');
    expect(showUser.email).toBe('johndoe@exemple.com',);
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.show({
        user_id: 'non-existing-user'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
