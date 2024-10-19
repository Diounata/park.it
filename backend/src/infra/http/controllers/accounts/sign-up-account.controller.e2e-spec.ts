import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';
import request from 'supertest';

describe('[Controller] Sign up account', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('[POST] /accounts/sign-up', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts/sign-up')
      .send({
        account: {
          name: 'User',
          email: 'user@email.com',
          rawPassword: '123456',
        },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
