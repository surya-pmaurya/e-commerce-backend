import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./interceptor/login.interceptor";
import { AllExceptionsFilter } from "./common/filter/error-handler";
import { setupSwagger } from "./swagger";
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import * as cookieParser from "cookie-parser";
const logger = new Logger("Main");

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  setupSwagger(app);
  await app.listen(process.env.SERVER_PORT ?? 3000);
  logger.log(`======================================================`);
  logger.log(`Application is running on ${await app.getUrl()}`);
  logger.log(`Swagger is running on URL:- ${await app.getUrl()}/api`);
  logger.log(`======================================================`);
};
bootstrap();
