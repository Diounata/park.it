import { Account } from '../../domain/entities/account';

export abstract class AccountsRepository {
  abstract create(account: Account): Promise<void>;
  abstract findAccountByEmail(email: string): Promise<Account | null>;
}
