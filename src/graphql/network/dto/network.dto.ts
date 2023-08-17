import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindNetworkInput {
  @Field(() => ID, { nullable: true, description: '' })
  chainId: number;

  @Field({ nullable: true, description: '' })
  name: string;
}
