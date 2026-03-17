import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('NestApplication');

  // Configurar pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(helmet());
  // Configurar CORS si está habilitado
  if (configService.get<boolean>('cors.enabled')) {
    app.enableCors({
      origin: configService.get<string[]>('cors.origins'),
      credentials: true,
    });
  }

  const port = configService.get<number>('app.port') || 3000;
  const host = configService.get<string>('app.host') || 'localhost';
  const env = configService.get<string>('app.env');
  const appName = configService.get<string>('app.name');
  const appVersion = configService.get<string>('app.version');

  await app.listen(port, host);

  logger.log(`✅ ${appName} v${appVersion} iniciado en http://${host}:${port}`);
  logger.log(`📝 Entorno: ${env}`);
  logger.log(`🔌 Base de datos: ${configService.get<string>('database.uri')}`);

  if (configService.get<boolean>('swagger.enabled')) {
    logger.log(
      `📚 Swagger disponible en http://${host}:${port}${configService.get<string>('swagger.path')}`,
    );
  }
}

void bootstrap();
