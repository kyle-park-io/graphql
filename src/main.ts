import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');
  await app.listen(port);
}
bootstrap();
