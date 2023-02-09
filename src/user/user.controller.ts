import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  Patch
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @ApiBody({ type: CreateUpdateUserDto })
  @ApiOkResponse({
    type: User,
    description: 'User has been created',
  })
  @Post('')
  create(
    @Body() dto: CreateUpdateUserDto,
  ) {
    return this.userService.create(dto);
  }

  @ApiOkResponse({
    type: User,
  })
  @Get(':id')
  get(
    @Param('id') id: string,
  ){
    return this.userService.findOne({ id });
  }

  @ApiOkResponse({
    type: CreateUpdateUserDto,
    description: 'User has been updated',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateUpdateUserDto,
  ){
    return this.userService.update(dto, id);
  }

  @ApiOkResponse({
    description: 'User has been deleted',
  })
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ){
    return this.userService.delete(id);
  }
}
