import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkResolver } from './network.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from '@app/database/entities/network.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  providers: [NetworkResolver, NetworkService],
})
export class NetworkModule {}
