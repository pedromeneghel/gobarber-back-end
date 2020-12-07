import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplate from '../dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplate): Promise<string> {
    return template;
  }
}
