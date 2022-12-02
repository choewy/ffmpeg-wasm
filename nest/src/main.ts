import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  await app.listen(30001, '::');

  if (process.env.pm_id) {
    process.send('ready');
  }
}

bootstrap();
