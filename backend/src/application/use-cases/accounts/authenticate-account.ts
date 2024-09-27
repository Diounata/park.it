import { AccountsRepository } from '../../repositories/accounts-repository'
import { UseCase } from '../use-case'

export interface Input {
  account: {
    email: string
    rawPassword: string
  }
}

export class AuthenticateAccountUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle(input: Input): Promise<string> {
    const account = await this.accountsRepository.findAccountByEmail(input.account.email)
    if (!account) throw new Error('Account not found')

    const isCorrectCredentials = account.verifyRawPassword(input.account.rawPassword)
    if (!isCorrectCredentials) throw new Error('Invalid account credentials')

    return 'signed-token'
  }
}
