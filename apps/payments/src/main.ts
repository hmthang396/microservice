import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  console.log(`Payment Service`);
  await app.listen(3000);
}
bootstrap();
