interface IMailConfig {
  driver: 'ses' | 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'vinicius.march@f1cobol.com',
      name: 'F1Cobol',
    },
  },
} as IMailConfig;
