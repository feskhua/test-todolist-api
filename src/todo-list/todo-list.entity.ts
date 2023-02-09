import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryColumn, 
  UpdateDateColumn 
} from "typeorm";
import { User } from "../user/user.entity";
import { TodoListItem } from "../todo-list-item/todo-list-item.entity";

@Entity('todo-list')
export class TodoList extends BaseEntity {
  @PrimaryColumn({generated: 'uuid'})
  id: string;

  @Column()
  title: string;

  @Column()
  userId: string;

  @DeleteDateColumn()
  deletedAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.toDoLists, {
    onDelete: 'CASCADE' 
  })
  @JoinColumn({name: 'userId'})
  user: User;

  @OneToMany(() => TodoListItem, (todoListItem) => todoListItem.toDoList)
  listItems: TodoListItem[];
}