import { Module } from '@nestjs/common';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { UserModule } from './user/user.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoListItemModule } from './todo-list-item/todo-list-item.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TodoListModule,
    TodoListItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
