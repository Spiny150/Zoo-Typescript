import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AnimalDto } from './animaux/dto/animal.dto';
import { CreateAnimalDto } from './animaux/dto/create-animal.dto';
import { EnclosDto } from './enclos/dto/enclos.dto';
import { CreateEnclosDto } from './enclos/dto/create-enclos.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Zoo API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [AnimalDto, CreateAnimalDto, EnclosDto, CreateEnclosDto],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
