import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { Employee } from './employees/entities/employee.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Busiman')
    .setDescription('Business Management API')
    .setVersion('1.0')
    .addTag('Busiman')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const employeeRepository = getRepository(Employee);
  if ((await employeeRepository.find()).length === 0) {
    const adminEmployee = employeeRepository.create({
      email: 'admin@admin.com',
      password: 'admin',
      name: 'admin',
      isAdmin: true,
      approvedByAdmin: true,
    });
    await employeeRepository.save(adminEmployee);
  }

  await app.listen(4000);
}
bootstrap();
