import { Account } from '../../../domain/entities/account'
import { AccountsRepository } from '../../repositories/accounts-repository'
import { UseCase } from '../use-case'

export interface Input {
  account: {
    name: string
    email: string
    rawPassword: string
  }
}

export class CreateAccountUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle(input: Input): Promise<void> {
    const accountByEmail = await this.accountsRepository.findAccountByEmail(input.account.email)
    if (!!accountByEmail) throw new Error('This email is being used')

    const account = new Account(input.account)

    await this.accountsRepository.create(account)
  }
}
