import { UsersRepository } from '../../repositories/users-repository'
import { UseCase } from '../use-case'

export interface Input {
  user: {
    email: string
    rawPassword: string
  }
}

export class AuthenticateUserUseCase implements UseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle(input: Input): Promise<string> {
    const user = await this.usersRepository.findUserByEmail(input.user.email)
    if (!user) throw new Error('User not found')

    const isCorrectCredentials = user.verifyRawPassword(input.user.rawPassword)
    if (!isCorrectCredentials) throw new Error('Invalid user credentials')

    return 'signed-token'
  }
}
