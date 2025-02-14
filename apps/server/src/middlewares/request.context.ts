import { Injectable } from "@nestjs/common";
import { Response } from "express";
import * as uuid from "uuid";
import { LoggerService } from "./logger.service";

@Injectable()
export class RequestContext {
  constructor(
    private readonly res: Response,
    readonly logger: LoggerService,
  ) {
    // Init request id
    const requestId = uuid.v4();

    // Init logger
    this.logger.appendData({ requestId });

    // // Request duration
    const startTime = Date.now();
    this.res.on("finish", () => {
      const endTime = Date.now();
      this.logger.info("Request duration", {
        startTime,
        endTime,
        duration: endTime - startTime,
      });
    });

    // Attach request id to response
    this.res.setHeader("request-id", requestId);
  }
}
