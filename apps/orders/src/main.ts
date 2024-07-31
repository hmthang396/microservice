import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  console.log(`Order Service`);
  await app.listen(3000);
}
bootstrap();
