import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generated(user_id: string): Promise<UserToken>;
}
