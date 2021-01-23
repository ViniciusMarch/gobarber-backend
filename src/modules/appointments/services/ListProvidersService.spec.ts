import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Dante Alighieri',
      email: 'dantesinferno@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Gol D. Roger',
      email: 'gold.roger@gmail.com',
      password: '331122',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Ricard Morth',
      email: 'greenkhalid@gmail.com',
      password: '878971',
    });

    const users = await listProviders.execute({ user_id: loggedUser.id });

    expect(users).toEqual([user1, user2]);
  });
});
