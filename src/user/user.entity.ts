import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryColumn, 
  UpdateDateColumn 
} from "typeorm";
import { TodoList } from "../todo-list/todo-list.entity";

@Entity({name: 'user'})
export class User extends BaseEntity {
  @PrimaryColumn({generated: 'uuid'})
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @DeleteDateColumn()
  deletedAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => TodoList, (toDoList) => toDoList.user, {
    cascade: true,
  })
  toDoLists: TodoList[];
}