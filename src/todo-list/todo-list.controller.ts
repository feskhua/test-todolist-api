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
import { UserService } from '../user/user.service';
import { CreateUpdateTodoListDto } from './dto/create-update-list.dto';
import { TodoList } from './todo-list.entity';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(
    private todoListService: TodoListService,
    private userService: UserService
  ){}

  @ApiBody({ type: CreateUpdateTodoListDto })
  @ApiOkResponse({
    type: TodoList,
    description: 'Todo list has been created',
  })
  @Post('')
  async create(
    @Body() dto: CreateUpdateTodoListDto,
  ) {
    const user = await this.userService.findOne({ id: dto.userId });

    if(!user) {
      throw new NotFoundException();
    };

    return this.todoListService.create(dto);
  }

  @ApiOkResponse({
    type: TodoList,
  })
  @Get(':id')
  get(
    @Param('id') id: string,
  ){
    return this.todoListService.findOne({ id });
  }

  @ApiOkResponse({
    type: CreateUpdateTodoListDto,
    description: 'Todo list has been updated',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateUpdateTodoListDto,
  ){
    return this.todoListService.update(dto, id);
  }

  @ApiOkResponse({
    description: 'Todo list has been deleted',
  })
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ){
    return this.todoListService.delete(id);
  }
}
