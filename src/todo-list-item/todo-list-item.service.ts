import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUpdateListItemDto } from './dto/create-update-list-item.dto';
import { TodoListItem } from './todo-list-item.entity';

@Injectable()
export class TodoListItemService {
  constructor(
    @InjectRepository(TodoListItem) 
    private listItemRepo: Repository<TodoListItem>
  ) {}

  public create( dto: CreateUpdateListItemDto ): Promise<TodoListItem>{
    return this.listItemRepo.save(dto);
  }

  public async findOne( options: FindOptionsWhere<TodoListItem>): Promise<TodoListItem> | never {
    const listItem = await this.listItemRepo.findOneOrFail({ 
      where: options, 
      relations: ['toDoList', 'toDoList.user'] 
    });

    if (!listItem) {
      throw new NotFoundException();
    }

    return listItem;
  }

  public async update(dto: CreateUpdateListItemDto, id: string): Promise<TodoListItem>{
    const oldItem = await this.findOne({ id });

    return this.listItemRepo.save({ ...oldItem, ...dto });
  }

  public async delete( id: string ): Promise<Partial<TodoListItem>>{
    const {deletedAt, ...deletedItem} = await this.findOne({ id });

    await this.listItemRepo.softDelete({ id });
    
    return deletedItem;
  }
}
