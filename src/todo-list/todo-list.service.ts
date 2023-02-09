import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUpdateTodoListDto } from './dto/create-update-list.dto';
import { TodoList } from './todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList) 
    private todoListRepo: Repository<TodoList>
  ) {}

  public create( dto: CreateUpdateTodoListDto ): Promise<TodoList>{
    return this.todoListRepo.save(dto);
  }

  public async findOne( options: FindOptionsWhere<TodoList> ): Promise<TodoList> | never {
    const todoList = await this.todoListRepo.findOneOrFail({ 
      where: options, 
      relations: ['user', 'listItems'] 
    });

    if (!todoList) {
      throw new NotFoundException();
    }

    return todoList;
  }

  public async update(dto: CreateUpdateTodoListDto, id: string): Promise<TodoList>{
    const oldList = await this.findOne({ id });

    return this.todoListRepo.save({...oldList, ...dto});
  }

  public async delete( id: string ): Promise<Partial<TodoList>>{
    const {deletedAt, ...deletedList} = await this.findOne({ id });

    await this.todoListRepo.softDelete({ id });

    return deletedList;
  }
}
