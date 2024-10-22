import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(envService: EnvService) {
        const jwtSecret = envService.get('JWT_SECRET');

        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
})
export class AuthModule {}
