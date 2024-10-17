import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { ZodSchema } from "zod";

export const createSchema = (
  schema: ZodSchema,
  additional: {
    title?: string;
    description?: string;
    default?: any;
    example?: any;
    examples?: any;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    required?: string[];
    enum?: any[];
    [x: string]: any;
  } = {},
) => {
  return extendApi(schema, additional);
};

export const schemaToDto = (schema: ReturnType<typeof createSchema>) => {
  return class Dto extends createZodDto(schema) {};
};
