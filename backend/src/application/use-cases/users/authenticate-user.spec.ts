import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory-databases/in-memory-users-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { AuthenticateUserUseCase, Input } from './authenticate-user'

let usersRepository: UsersRepository
let sut: AuthenticateUserUseCase

describe('[UC] Authenticate user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should authenticate a user with correct credentials', async () => {
    const input: Input = {
      user: {
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    }

    const response = await sut.handle(input)

    expect(response).toBe('signed-token')
  })

  it('should not authenticate user with wrong credentials', async () => {
    const input: Input = {
      user: {
        email: 'johndoe@email.com',
        rawPassword: '654321',
      },
    }

    expect(sut.handle(input)).rejects.toThrow(new Error('Invalid user credentials'))
  })

  it.skip('should throws when trying to authenticate a non existent user', async () => {
    const input: Input = {
      user: {
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    }

    expect(sut.handle(input)).rejects.toThrow('User not found')
  })
})
