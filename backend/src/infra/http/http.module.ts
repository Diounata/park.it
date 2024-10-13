import { Module } from '@nestjs/common';

import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { DatabaseModule } from '../database/database.module';
import { SignUpAccountController } from './controllers/accounts/sign-up-account.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SignUpAccountController],
  providers: [SignUpAccountUseCase],
})
export class HttpModule {}
