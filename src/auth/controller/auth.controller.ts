import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { JWTResponseDTO } from '../jwt/dto/JWT-dto';
import { LocalAuthGuard } from '../local/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBasicAuth()
  @ApiBody({
    schema: {
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  })
  @ApiCreatedResponse({
    description: "Credenciais válidas, autenticação realizada",
    type: JWTResponseDTO
  })
  @ApiUnauthorizedResponse({
    description: "Credenciais inválidas: usuário não encontrado ou senha inválida",
    schema: {
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}