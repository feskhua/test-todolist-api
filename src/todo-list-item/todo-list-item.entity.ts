import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn, 
  UpdateDateColumn 
} from "typeorm";
import { TodoList } from "../todo-list/todo-list.entity";

@Entity({name: 'todo-list-item'})
export class TodoListItem extends BaseEntity {
  @PrimaryColumn({generated: 'uuid'})
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column( {default: false} )
  done: boolean;

  @Column()
  listId: string;

  @DeleteDateColumn()
  deletedAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => TodoList, (toDoList) => toDoList.listItems, {
    onDelete: 'CASCADE' 
  })
  @JoinColumn({name: 'listId'})
  toDoList: TodoList;
}