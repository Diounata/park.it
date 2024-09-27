import { User } from '../../../domain/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { UseCase } from '../use-case'

export interface Input {
  user: {
    name: string
    email: string
    rawPassword: string
  }
}

export class CreateUserUseCase implements UseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle(input: Input): Promise<void> {
    const userByEmail = await this.usersRepository.findUserByEmail(input.user.email)
    if (!!userByEmail) throw new Error('This email is being used')

    const user = new User(input.user)

    await this.usersRepository.create(user)
  }
}
