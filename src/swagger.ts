import { INestApplication, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): any => {
  const logger = new Logger("Swagger");
  const config = new DocumentBuilder()
    .setTitle("Churn Network MiniProject")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("MiniProject")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  logger.log(`======================================================`);
  logger.log(`Added endpoint for swagger at ${"/api"}`);
  logger.log(`======================================================`);
};
