import { Module } from '@nestjs/common';
import { NetworkModule } from './network/network.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NetworkModule, UserModule],
})
export class GraphqlModule {}
