import { DataSource, DataSourceOptions } from 'typeorm';
import { TodoListItem } from './todo-list-item/todo-list-item.entity';
import { TodoList } from './todo-list/todo-list.entity';
import { User } from './user/user.entity';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  port: +configService.get('DB_PORT'),
  host:  configService.get('DB_HOST'),
  database: configService.get('DB_NAME'),
  migrationsRun: true,
  synchronize: true,
  entities: [User, TodoList, TodoListItem],
};

export const dataSource = new DataSource(dataSourceOptions);
