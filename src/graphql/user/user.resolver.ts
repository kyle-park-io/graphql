import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import {
  CreateUserInput,
  UpdateUserInput,
  FindUserQuery,
} from './dto/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'getAllUsers' })
  async findAll(): Promise<any> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('address', { type: () => ID }) address: string) {
    try {
      return await this.userService.findOne(address);
    } catch (err) {
      throw err;
    }
  }

  @Query(() => User, { name: 'getUser_Query' })
  async findUser(@Args('user_query') findUserQuery: FindUserQuery) {
    try {
      return await this.userService.findUser(findUserQuery);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.userService.update(updateUserInput);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('address', { type: () => ID }) address: string) {
    try {
      return await this.userService.remove(address);
    } catch (err) {
      throw err;
    }
  }
}
