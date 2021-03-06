import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Learning Nest")
    .setDescription("Little API created to learn about the framework.")
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document)

  await app.listen(3333);
}
bootstrap();
