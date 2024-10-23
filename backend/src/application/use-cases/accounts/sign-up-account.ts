import { Injectable } from '@nestjs/common';
import { Encrypter } from 'src/application/cryptography/encrypter';
import { Either, left, right } from 'src/core/either';
import { Account } from '../../../domain/entities/account';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { UseCase } from '../use-case';
import { EmailBeingUsedError } from './errors/email-being-used-error';

export interface Input {
  account: {
    name: string;
    email: string;
    rawPassword: string;
  };
}

export type Output = Either<Error, { accessToken: string }>;

@Injectable()
export class SignUpAccountUseCase implements UseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private encrypter: Encrypter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const accountByEmail = await this.accountsRepository.findAccountByEmail(
      input.account.email,
    );
    if (accountByEmail) {
      return left(new EmailBeingUsedError(accountByEmail.getEmail()));
    }

    const account = new Account(input.account);

    await this.accountsRepository.create(account);

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
      name: account.getName(),
    });

    return right({ accessToken });
  }
}
