export class Email {
  private value: string

  constructor(email: string) {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) throw new Error('Invalid email')
    this.value = email
  }

  public getValue() {
    return this.value
  }
}
