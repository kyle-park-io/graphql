import { InputType, Field, ID, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { description: '' })
  address: string;

  @Field({ description: '' })
  name: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

@InputType()
export class FindUserQuery {
  @Field(() => ID, { description: '' })
  address: string;

  @Field(() => Int, { description: '' })
  offset: number;

  @Field(() => Int, { description: '' })
  limit: number;

  @Field({ description: '' })
  sort: string;
}
