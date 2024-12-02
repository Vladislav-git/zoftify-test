import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteUserDto, UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('put')
  @HttpCode(HttpStatus.OK)
  updateUser(@Body() dto: UserDto) {
    return this.userService.updateUser(dto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto.id);
  }
}
