import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Network } from '@app/database/entities/network.entity';
import { FindNetworkInput } from './dto/network.dto';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network) private networkRepository: Repository<Network>,
  ) {}

  async findAll(): Promise<Network[]> {
    try {
      return await this.networkRepository.find();
    } catch (err) {
      console.log('findAll error');
      throw err;
    }
  }

  async findOne(findNetworkInput: FindNetworkInput): Promise<Network> {
    try {
      if (findNetworkInput.chainId) {
        return await this.networkRepository.findOne({
          where: { chainId: findNetworkInput.chainId },
        });
      } else if (findNetworkInput.name) {
        return await this.networkRepository.findOne({
          where: { name: findNetworkInput.name },
        });
      }
    } catch (err) {
      console.log('findOne error');
      throw err;
    }
  }
}
