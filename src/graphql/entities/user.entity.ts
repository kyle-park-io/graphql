import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: '' })
  address: string;

  @Field({ description: '' })
  name: string;

  @Field(() => [Token])
  tokens: Token[];
}

@ObjectType()
export class Token {
  @Field(() => ID, { description: '' })
  address: number;

  @Field({ description: '' })
  name: string;

  @Field({ description: '' })
  balance: string;
}
