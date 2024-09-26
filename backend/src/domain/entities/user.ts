import { Email } from '../value-objects/email'

interface UserProps {
  id?: string
  name: string
  email: string
}

export class User {
  private readonly id: string
  private name: string
  private email: Email

  constructor({ id, name, email }: UserProps) {
    this.id = id ?? crypto.randomUUID()
    this.name = name
    this.email = new Email(email)
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
}
