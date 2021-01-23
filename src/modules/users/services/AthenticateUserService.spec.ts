import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Dante',
      email: 'dantesinferno@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'dantesinferno@gmail.com',
      password: '123456',
    });

    // Para verificar que foi criado com sucesso, posso ver se estão com as propriedades especificadas
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'dantesinferno@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Dante',
      email: 'dantesinferno@gmail.com',
      password: '123456',
    });

    // Para verificar que foi criado com sucesso, posso ver se estão com as propriedades especificadas
    await expect(
      authenticateUser.execute({
        email: 'dantesinferno@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
