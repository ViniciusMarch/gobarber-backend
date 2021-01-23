import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the perfil', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Dante Alighieri',
      email: 'dantesinferno@gmail.com',
      password: '123456',
    });

    const updatedUser = await showProfile.execute({ user_id: user.id });

    expect(updatedUser.name).toBe('Dante Alighieri');
    expect(updatedUser.email).toBe('dantesinferno@gmail.com');
  });

  it('should not be able to show the perfil from non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'a non existing user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
