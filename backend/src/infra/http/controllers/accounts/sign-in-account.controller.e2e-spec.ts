import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';
import request from 'supertest';

describe('[Controller] Sign in account', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('[POST] /accounts/sign-in', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts/sign-in')
      .send({
        account: {
          email: 'johndoe@email.com',
          rawPassword: '123456',
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
