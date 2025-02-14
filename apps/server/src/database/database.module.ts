import { Module } from "@nestjs/common";
import { ConfigModuleOptions } from "@nestjs/config";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forRoot(options?: ConfigModuleOptions) {
    return {
      module: DatabaseModule,
      global: options?.isGlobal || false,
    };
  }
}
