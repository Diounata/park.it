import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory-databases/in-memory-users-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { CreateUserUseCase, Input } from './create-user'

let usersRepository: UsersRepository
let sut: CreateUserUseCase

describe('[UC] Create user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should create a user', async () => {
    const input: Input = {
      user: {
        name: 'Username',
        email: 'user@email.com',
        rawPassword: '123456',
      },
    }

    expect(sut.handle(input)).resolves
  })

  it('should not create a user with an email being used', async () => {
    const input: Input = {
      user: {
        name: 'Username',
        email: 'user@email.com',
        rawPassword: '123456',
      },
    }

    await sut.handle(input)
    expect(sut.handle(input)).rejects.toThrow(new Error('This email is being used'))
  })
})
