import { Task } from "@/domain/entities/task.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TaskORMEntity implements Task {
  @PrimaryGeneratedColumn()
  id: Task["id"];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    enum: ["TODO", "IN-PROGRESS", "DONE"],
    type: "enum",
  })
  status: Task["status"];

  @Column()
  createdBy: Task["createdBy"];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
