import { Resolver, Query, Args } from '@nestjs/graphql';
import { NetworkService } from './network.service';
import { Network } from '../entities/network.entity';
import { FindNetworkInput } from './dto/network.dto';

@Resolver()
export class NetworkResolver {
  constructor(private readonly networkService: NetworkService) {}

  @Query(() => [Network], { name: 'getAllNetworks' })
  async findAll(): Promise<any> {
    try {
      return await this.networkService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Query(() => Network, { name: 'getNetwork' })
  async findOne(@Args('input') findNetworkInput: FindNetworkInput) {
    try {
      return await this.networkService.findOne(findNetworkInput);
    } catch (err) {
      throw err;
    }
  }
}
