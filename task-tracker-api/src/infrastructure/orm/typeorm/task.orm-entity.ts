import { Task } from "@/domain/entities/task.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserORMEntity } from "./user.orm-entity";

@Entity({
  name: "tasks",
})
export class TaskORMEntity implements Task {
  @PrimaryGeneratedColumn()
  id: Task["id"];

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    enum: ["TODO", "IN-PROGRESS", "DONE"],
    type: "enum",
    default: "TODO",
  })
  status: Task["status"];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations
  @ManyToOne(() => UserORMEntity, (user) => user.tasks)
  createdBy: UserORMEntity["id"];
}
