import { Account } from '../../domain/entities/account'

export interface AccountsRepository {
  create(account: Account): Promise<void>
  findAccountByEmail(email: string): Promise<Account | null>
}
