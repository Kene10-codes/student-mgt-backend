import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import helmet from 'helmet';
configDotenv()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(helmet())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.contentSecurityPolicy())
  const config = new DocumentBuilder()
    .setTitle("Student's Report Management System")
    .setDescription("This is a student Student's Report Management System API")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('student-portal')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json'
  });

  app.setGlobalPrefix("api/v1")
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
