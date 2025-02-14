import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request } from "express";
import { EnvironmentVariables } from "~/common/types/env.type";
import { LoggerService } from "./logger.service";
import { RequestContext } from "./request.context";

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  use(req: Request, res, next: NextFunction) {
    const loggerService = new LoggerService(this.configService);
    const requestContext = new RequestContext(res, loggerService);
    req.context = requestContext;

    next();
  }
}
