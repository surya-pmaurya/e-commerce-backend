import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { AuthGuard } from "src/common/guards/auths.guards";
import { RolesGuard } from "src/common/guards/roles.guards";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      // override AuthGuard while testing 
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })

      // override RolesGuard while testing
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("UsersController (e2e)", () => {
    it("/users/getAll (GET)", () => {
      return request(app.getHttpServer()).get("/users/getAll").expect(200);
    });
  });
});
