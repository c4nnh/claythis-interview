import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SentryModule } from "@sentry/nestjs/setup";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { MenusModule } from "./menus/menus.module";
import { MiddlewaresModule } from "./middlewares/middlewares.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot({ isGlobal: true }),
    SentryModule.forRoot(),
    MenusModule,
    MiddlewaresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
