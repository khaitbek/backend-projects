import { ApiProperty } from "@nestjs/swagger";

export class User {
    id: number;

    @ApiProperty({
        description: "A unique username",
        example: "mr_no_one",
        required: true
    })
    username: string;
}