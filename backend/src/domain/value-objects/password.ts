export interface Password {
  getValue(): string;
  verifyRawPassword(rawPassword: string): boolean;
}

class PlainPassword implements Password {
  private value: string;

  constructor(value: string) {
    if (value.length < 6)
      throw new Error('Password must be greater than 5 characters');
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  verifyRawPassword(rawPassword: string): boolean {
    return rawPassword === this.value;
  }
}

export class PasswordFactory {
  static create({
    rawPassword,
    type,
  }: {
    rawPassword: string;
    type: string;
  }): Password {
    if (type === 'plain') return new PlainPassword(rawPassword);
    throw new Error('Invalid type');
  }
}
