import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAccountsRepository } from '../../../infra/repositories/in-memory-databases/in-memory-accounts-repository'
import { AccountsRepository } from '../../repositories/accounts-repository'
import { CreateAccountUseCase, Input } from './create-account'

let accountsRepository: AccountsRepository
let sut: CreateAccountUseCase

describe('[UC] Create account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository()
    sut = new CreateAccountUseCase(accountsRepository)
  })

  it('should create an account', async () => {
    const input: Input = {
      account: {
        name: 'Account name',
        email: 'new.account@email.com',
        rawPassword: '123456',
      },
    }

    expect(sut.handle(input)).resolves
  })

  it('should not create an account with an email being used', async () => {
    const input: Input = {
      account: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    }

    expect(sut.handle(input)).rejects.toThrow(new Error('This email is being used'))
  })
})
