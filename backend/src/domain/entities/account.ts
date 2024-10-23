import { v4 as uuid } from 'uuid';
import { Email } from '../value-objects/email';
import { Password, PasswordFactory } from '../value-objects/password';
import { Timestamp } from '../value-objects/timestamp';

interface AccountProps {
  id?: string;
  name: string;
  email: string;
  rawPassword: string;
  timestamp?: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export class Account {
  private readonly id: string;
  private name: string;
  private email: Email;
  private password: Password;
  private timestamp: Timestamp;

  constructor({ id, name, email, rawPassword, timestamp }: AccountProps) {
    this.id = id ?? uuid();
    this.name = name;
    this.email = new Email(email);
    this.password = PasswordFactory.create({ rawPassword, type: 'plain' });
    this.timestamp = new Timestamp(timestamp?.createdAt, timestamp?.updatedAt);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }

  verifyRawPassword(password: string) {
    return this.password.verifyRawPassword(password);
  }

  getTimestamp() {
    return this.timestamp;
  }
}
