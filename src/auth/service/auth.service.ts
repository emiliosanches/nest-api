import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model/user.entity';
import { JWTResponseDTO } from '../jwt/dto/JWT-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validate(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username)

    if (!user) {
      return null
    }

    if (await bcrypt.compare(password, user.password)) return { valid: true, user }

    return { valid: false }
  }

  async login(user: User): Promise<JWTResponseDTO> {
    const payload = { username: user.username, sub: user.id }

    return {
      token: this.jwtService.sign(payload),
      user
    }
  }
}
