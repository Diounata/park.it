import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAccountsRepository } from '../../../infra/repositories/in-memory-databases/in-memory-accounts-repository'
import { AccountsRepository } from '../../repositories/accounts-repository'
import { AuthenticateAccountUseCase, Input } from './authenticate-account'

let accountsRepository: AccountsRepository
let sut: AuthenticateAccountUseCase

describe('[UC] Authenticate account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository()
    sut = new AuthenticateAccountUseCase(accountsRepository)
  })

  it('should authenticate an account with correct credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    }

    const response = await sut.handle(input)

    expect(response).toBe('signed-token')
  })

  it('should not authenticate an account with wrong credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '654321',
      },
    }

    expect(sut.handle(input)).rejects.toThrow(new Error('Invalid account credentials'))
  })

  it('should throws when trying to authenticate a non existent account', async () => {
    const input: Input = {
      account: {
        email: 'non.existent.account@email.com',
        rawPassword: '123456',
      },
    }

    expect(sut.handle(input)).rejects.toThrow('Account not found')
  })
})
