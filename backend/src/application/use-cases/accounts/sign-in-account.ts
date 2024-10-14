import { Injectable } from '@nestjs/common';
import { Encrypter } from 'src/application/cryptography/encrypter';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { UseCase } from '../use-case';

export interface Input {
  account: {
    email: string;
    rawPassword: string;
  };
}

export interface Output {
  accessToken: string;
}

@Injectable()
export class SignInAccountUseCase implements UseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private encrypter: Encrypter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountByEmail(
      input.account.email,
    );
    if (!account) throw new Error('Account not found');

    const isCorrectCredentials = account.verifyRawPassword(
      input.account.rawPassword,
    );
    if (!isCorrectCredentials) throw new Error('Invalid account credentials');

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
    });

    return { accessToken };
  }
}
