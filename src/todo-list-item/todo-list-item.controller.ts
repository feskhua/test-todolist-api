import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  NotFoundException, 
  Param, 
  Patch, 
  Post 
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { TodoListService } from '../todo-list/todo-list.service';
import { CreateUpdateListItemDto } from './dto/create-update-list-item.dto';
import { TodoListItem } from './todo-list-item.entity';
import { TodoListItemService } from './todo-list-item.service';

@Controller('todo-list-item')
export class TodoListItemController {
  constructor(
    private itemService: TodoListItemService,
    private todoListService: TodoListService
  ){}

  @ApiBody({ type: CreateUpdateListItemDto })
  @ApiOkResponse({
    type: TodoListItem,
    description: 'List item has been created',
  })
  @Post('')
  async create(
    @Body() dto: CreateUpdateListItemDto,
  ) {
    const todoList = await this.todoListService.findOne({ id: dto.listId });

    if(!todoList) {
      throw new NotFoundException();
    };

    return this.itemService.create(dto);
  }

  @ApiOkResponse({
    type: TodoListItem,
  })
  @Get(':id')
  get(
    @Param('id') id: string,
  ){
    return this.itemService.findOne({ id });
  }

  @ApiOkResponse({
    type: TodoListItem,
    description: 'List item has been updated',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateUpdateListItemDto,
  ){
    return this.itemService.update(dto, id);
  }

  @ApiOkResponse({
    description: 'List item has been deleted',
  })
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ){
    return this.itemService.delete(id);
  }
}
