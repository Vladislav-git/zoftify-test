import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async updateUser(dto: UserDto) {
    const data = { ...dto } as Partial<UserDto> & { hash?: string };

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!userExists) {
      throw new NotFoundException('no such user');
    }

    if (dto.password && dto.password !== '' && dto.password !== null) {
      data.hash = await argon.hash(dto.password);
      delete data.password;
    } else {
      delete data.password;
    }
    return await this.prisma.user.update({
      where: { id: dto.id },
      data,
    });
  }

  async deleteUser(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new NotFoundException('no such user');
    }
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
