import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAccountsRepository } from '../../../infra/database/in-memory-databases/in-memory-accounts-repository';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { Input, SignInAccountUseCase } from './sign-in-account';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: SignInAccountUseCase;

describe('[UC] Sign in account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new SignInAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should sign in an account with correct credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    };

    expect(sut.handle(input)).resolves.toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not sign in an account with wrong credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '654321',
      },
    };

    expect(sut.handle(input)).rejects.toThrow(
      new Error('Invalid account credentials'),
    );
  });

  it('should throws when trying to sign in a non existent account', async () => {
    const input: Input = {
      account: {
        email: 'non.existent.account@email.com',
        rawPassword: '123456',
      },
    };

    expect(sut.handle(input)).rejects.toThrow('Account not found');
  });
});
