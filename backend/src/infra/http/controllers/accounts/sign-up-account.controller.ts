import { Controller, Post } from '@nestjs/common';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';

@Controller('/accounts')
export class SignUpAccountController {
  constructor(private signUpAccountUseCase: SignUpAccountUseCase) {}

  @Post()
  async handle() {
    await this.signUpAccountUseCase.handle({
      account: {
        name: 'Name',
        email: 'email@email.com',
        rawPassword: '123456',
      },
    });
  }
}
