import { Body, Controller, Post } from '@nestjs/common';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const signUpAccountSchema = z.object({
  account: z.object({
    name: z.string(),
    email: z.string().email(),
    rawPassword: z.string().min(6),
  }),
});

type SignUpAccountSchema = z.infer<typeof signUpAccountSchema>;

@Controller('accounts')
export class SignUpAccountController {
  constructor(private signUpAccountUseCase: SignUpAccountUseCase) {}

  @Post('sign-up')
  async handle(
    @Body(new ZodValidationPipe(signUpAccountSchema))
    { account }: SignUpAccountSchema,
  ) {
    const { accessToken } = await this.signUpAccountUseCase.handle({
      account: {
        name: account.name,
        email: account.email,
        rawPassword: account.rawPassword,
      },
    });

    return { accessToken };
  }
}
