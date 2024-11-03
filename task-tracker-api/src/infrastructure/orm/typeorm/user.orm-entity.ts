import { User } from "@/domain/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskORMEntity } from "./task.orm-entity";

@Entity({
  name: "users",
})
export class UserORMEntity implements User {
  @PrimaryGeneratedColumn()
  id: User["id"];

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthDate?: string;

  @Column({
    nullable: true,
  })
  firstName?: string;

  @Column({
    nullable: true,
  })
  lastName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations
  @OneToMany(() => TaskORMEntity, (task) => task.createdBy)
  tasks: TaskORMEntity[];
}
