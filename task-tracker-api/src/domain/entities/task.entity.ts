import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

export class Task {
  id: number;
  title: string;
  @ApiProperty({
    description: "The title of the task",
    example: "Do nothing",
    required: true,
  })
  description: string | undefined;
  status: "TODO" | "IN-PROGRESS" | "DONE";
  @ApiProperty({
    description: "The status of the task",
    example: "TODO",
    required: true,
    enum: ["TODO", "IN-PROGRESS", "DONE"],
    default: "TODO",
  })
  createdBy: User["id"];
  createdAt: Date;
  updatedAt: Date | undefined;
}
