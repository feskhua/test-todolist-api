import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TodoList } from './todo-list.entity';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList]), UserModule],
  controllers: [TodoListController],
  providers: [TodoListService],
  exports: [TodoListService]
})
export class TodoListModule {}
