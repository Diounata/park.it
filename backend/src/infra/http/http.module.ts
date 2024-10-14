import { Module } from '@nestjs/common';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { SignUpAccountController } from './controllers/accounts/sign-up-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SignUpAccountController],
  providers: [SignUpAccountUseCase],
})
export class HttpModule {}
