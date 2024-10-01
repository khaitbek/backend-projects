import { ApiProperty } from "@nestjs/swagger";

export class Task {
  id: number;

  title: string;
  @ApiProperty({
    description: "The title of the task",
    example: "Do nothing",
    required: true
  })

  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
