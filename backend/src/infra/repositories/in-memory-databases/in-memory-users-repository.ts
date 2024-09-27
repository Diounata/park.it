import { UsersRepository } from '../../../application/repositories/users-repository'
import { User } from '../../../domain/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.getEmail() === email)
    return user ?? null
  }
}
