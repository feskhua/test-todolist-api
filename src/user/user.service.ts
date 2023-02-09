import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepo: Repository<User>,
  ) {}

  public create( dto: CreateUpdateUserDto ): Promise<User>{
    return this.userRepo.save(dto);
  }

  public async findOne( options: FindOptionsWhere<User> ): Promise<User> | never {
    const user = await this.userRepo.findOneOrFail({ 
      where: options, 
      relations: ['toDoLists', 'toDoLists.listItems'] 
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async update(dto: CreateUpdateUserDto, id: string): Promise<User>{
    const oldUser = await this.findOne({ id });

    return this.userRepo.save({ ...oldUser, ...dto });
  }

  public async delete( id: string ): Promise<Partial<User>> {
    const {deletedAt, ...deletedUser} = await this.findOne({ id });

    await this.userRepo.softDelete({ id });

    return deletedUser;
  }
}
