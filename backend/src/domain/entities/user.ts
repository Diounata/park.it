import { v4 as uuid } from 'uuid'

import { Email } from '../value-objects/email'
import { Password, PasswordFactory } from '../value-objects/password'

interface UserProps {
  id?: string
  name: string
  email: string
  rawPassword: string
}

export class User {
  private readonly id: string
  private name: string
  private email: Email
  private password: Password

  constructor({ id, name, email, rawPassword }: UserProps) {
    this.id = id ?? uuid()
    this.name = name
    this.email = new Email(email)
    this.password = PasswordFactory.create({ rawPassword, type: 'plain' })
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email.getValue()
  }

  getPassword() {
    return this.password.getValue()
  }

  verifyRawPassword(password: string) {
    return this.password.verifyRawPassword(password)
  }
}
