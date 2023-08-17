import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  UpdateUserInput,
  FindUserQuery,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/database/entities/user.entity';
import { Token } from '@app/database/entities/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: ['tokens'] });
    } catch (err) {
      console.log('findAll error');
      throw err;
    }
  }

  async findOne(address: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { address: address },
        relations: ['tokens'],
      });
    } catch (err) {
      console.log('findOne error');
      throw err;
    }
  }

  async findUser(findUserQuery: FindUserQuery): Promise<User[]> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.tokens', 'token')
        .take(findUserQuery.limit)
        .getMany();
    } catch (err) {
      console.log('findUserQuery error');
      throw err;
    }
  }

  async create(createUserInput: CreateUserInput): Promise<any> {
    try {
      await this.userRepository.insert(createUserInput);
      return true;
    } catch (err) {
      console.log('create error');
      throw err;
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<any> {
    try {
      await this.userRepository.update(
        updateUserInput.address,
        updateUserInput,
      );
      return true;
    } catch (err) {
      console.log('update error');
      throw err;
    }
  }

  async remove(address: string): Promise<any> {
    try {
      await this.userRepository.delete(address);
      return true;
    } catch (err) {
      console.log('remove error');
      throw err;
    }
  }
}
