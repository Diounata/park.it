import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAccountsRepository } from '../../../infra/database/in-memory-databases/in-memory-accounts-repository';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { Input, SignUpAccountUseCase } from './sign-up-account';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: SignUpAccountUseCase;

describe('[UC] Sign up account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new SignUpAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should sign up an account', async () => {
    const input: Input = {
      account: {
        name: 'Account name',
        email: 'new.account@email.com',
        rawPassword: '123456',
      },
    };

    expect(sut.handle(input)).resolves.toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not sign up an account with an email being used', async () => {
    const input: Input = {
      account: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    };

    expect(sut.handle(input)).rejects.toThrow(
      new Error('This email is being used'),
    );
  });
});
