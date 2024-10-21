import { Module } from '@nestjs/common';
import { AccountsRepository } from 'src/application/repositories/accounts-repository';
import { InMemoryAccountsRepository } from './in-memory-databases/in-memory-accounts-repository';

@Module({
  providers: [
    {
      provide: AccountsRepository,
      useClass: InMemoryAccountsRepository,
    },
  ],
  exports: [AccountsRepository],
})
export class DatabaseModule {}
