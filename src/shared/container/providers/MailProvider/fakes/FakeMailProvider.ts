import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push({
      to: message.to.email,
      body: message.templateData.file,
    });
  }
}
