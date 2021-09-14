import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../DTO/create-user-dto';
import { UpdateUserDTO } from '../DTO/update-user-dto';
import { User } from '../model/user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from '../../casl/actions';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, 
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException({
      message: "Usuário não encontrado"
    })

    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      username
    });
  }

  async create(data: CreateUserDTO): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(data.password, salt)

    return this.usersRepository.save({
      ...data,
      password: hashedPass,
      id: uuidv4()
    }).then(user => user.id)
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, data: UpdateUserDTO, loggedUser: User): Promise<any> {
    const ability = this.caslAbilityFactory.createForUser(loggedUser);

    let user = await this.findOne(id);

    if (!ability.can(Action.Update, user)) throw new ForbiddenException({
      message: "Você não está autorizado a editar esse usuário"
    })

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt)
    }

    user = this.usersRepository.merge(user, data)

    return this.usersRepository.save(user);
  }
}
