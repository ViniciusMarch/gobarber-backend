import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import faker from 'faker';

import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

usersRoutes.get('/lorem', (request: Request, response: Response) => {
  const data = new Array(15000).fill('banana-prata'); // .map((value, index) => (faker.lorem.words(3))).sort();
  return response.json(data);
});

export default usersRoutes;
