import { Req } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request  } from 'express';
import { JwtAuthGuard } from '../..//auth/jwt/jwt.guard';
import { CreateUserDTO } from '../DTO/create-user-dto';
import { UpdateUserDTO } from '../DTO/update-user-dto';
import { User } from '../model/user.entity';
import { UsersService } from '../providers/users.service';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: "Listagem de usuários bem-sucedida",
    type: User,
    isArray: true
  })
  @Get()
  async listUsers() {
    return await this.usersService.findAll();
  }

  @ApiOkResponse({
    description: "Usuário encontrado",
    type: User
  })
  @ApiNotFoundResponse({
    description: "Usuário não encontrado"
  })
  @Get(':id')
  async showUser(@Param('id') id: string) {
    return await this.usersService.findOne(id)
  }

  @ApiCreatedResponse({
    description: "Usuário criado com sucesso",
    schema: {
      properties: {
        id: {
          type: 'string'
        }
      }
    }
  })
  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    const id = await this.usersService.create(body)
    return { id }
  }

  @ApiBearerAuth()
  @ApiOkResponse({ 
    description: 'Usuário atualizado com sucesso',
    type: User
  })
  @ApiForbiddenResponse({
    description: 'Tentativa de alterar um usuário enquanto autenticado como outro usuário'
  })
  @ApiUnauthorizedResponse({
    description: 'Tentativa de alterar um usuário enquanto não autenticado'
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO, @Req() req: Request) {
    const loggedUser = req.user;
    return await this.usersService.update(id, body, loggedUser)
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Usuário excluído com sucesso'
  })
  @ApiForbiddenResponse({
    description: 'Tentativa de excluir um usuário enquanto autenticado como outro usuário'
  })
  @ApiUnauthorizedResponse({
    description: 'Tentativa de excluir um usuário enquanto não autenticado'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(id)
  }
}
