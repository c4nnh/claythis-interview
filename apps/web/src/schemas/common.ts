import { z } from "zod";

export const NotEmptyString = z
  .string()
  .trim()
  .min(1, "This field cannot be empty");
