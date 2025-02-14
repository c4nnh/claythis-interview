import "express";
import { RequestContext } from "./middlewares/request.context";

declare module "express" {
  export interface Request {
    context: RequestContext;
  }
}
