import {
  type ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new HttpException(
        {
          status: 400,
          message: result.error.issues.map((issue) => issue.message),
          name: result.error.name,
        },
        400,
      );
    }
    return value;
  }
}
