import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

export const taskSchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN-PROGRESS", "DONE"]),
    createdBy: z.string(),
    createdAt: z.string(),
  }),
);

export class TaskDto extends createZodDto(taskSchema) {}
export class GetAllTasksDto extends createZodDto(taskSchema.array()) {}
export class GetOneTaskByIdDto extends createZodDto(taskSchema) {}
