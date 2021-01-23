import IMailTemplateProviderDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IMailTemplateProviderDTO): Promise<string>;
}
