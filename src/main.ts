import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import helmet from 'helmet';
configDotenv()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle("Student's Report Management System")
    .setDescription("This is a student Student's Report Management System API")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('student-portal')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json'
  });

  app.setGlobalPrefix("api")
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
