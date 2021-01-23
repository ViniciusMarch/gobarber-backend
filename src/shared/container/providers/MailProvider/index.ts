import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

// Permitindo que ele receba uma injeção de dependencia (assim como feito nas rotas)
container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
