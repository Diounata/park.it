import { Injectable } from '@nestjs/common';
import { Encrypter } from 'src/application/cryptography/encrypter';
import { Either, left, right } from 'src/core/either';
import { InvalidCredentialsError } from 'src/core/errors/errors/invalid-credentials-error';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { UseCase } from '../use-case';

export interface Input {
  account: {
    email: string;
    rawPassword: string;
  };
}

export type Output = Either<Error, { accessToken: string }>;

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
    if (!account) return left(new ResourceNotFoundError());

    const isCorrectCredentials = account.verifyRawPassword(
      input.account.rawPassword,
    );
    if (!isCorrectCredentials) return left(new InvalidCredentialsError());

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
      name: account.getName(),
    });

    return right({
      accessToken,
    });
  }
}
