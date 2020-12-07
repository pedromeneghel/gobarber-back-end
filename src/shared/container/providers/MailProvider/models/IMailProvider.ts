import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
