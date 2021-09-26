import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./kinotes-firebase-adminsdk-d53iw-f30fbd1dbc.json');

async function bootstrap() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://kinotes.firebaseapp.com',
    });
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
