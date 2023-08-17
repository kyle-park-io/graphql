import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Network {
  @Field(() => ID, { description: '' })
  chainId: string;

  @Field({ description: '' })
  name: string;
}
