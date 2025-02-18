import { z } from "zod";
import { NotEmptyString } from "./common";

export const CreateMenuSchema = z.object({
  name: NotEmptyString,
});

export const UpdateMenuSchema = z.object({
  name: NotEmptyString,
});
