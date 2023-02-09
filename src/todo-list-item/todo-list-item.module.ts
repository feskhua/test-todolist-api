import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListModule } from '../todo-list/todo-list.module';
import { TodoListItem } from './todo-list-item.entity';
import { TodoListItemController } from './todo-list-item.controller';
import { TodoListItemService } from './todo-list-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListItem]), TodoListModule],
  controllers: [TodoListItemController],
  providers: [TodoListItemService]
})
export class TodoListItemModule {}
