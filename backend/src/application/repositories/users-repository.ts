import { User } from '../../domain/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  findUserByEmail(email: string): Promise<User | null>
}
