import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, DatabaseService } from '@app/database';
import { HistoryEntity } from '@app/database/entities/history.entity';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [
            () => {
              return yaml.load(readFileSync('config.yaml', 'utf8')) as Record<
                string,
                any
              >;
            },
          ],
          cache: true,
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule],
          useClass: DatabaseService,
          inject: [DatabaseService],
        }),
        TypeOrmModule.forFeature([HistoryEntity]),
      ],
      controllers: [AppController],
      providers: [AppService, Logger],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('ping', () => {
    it('should return "pong"', () => {
      expect(appController.ping()).toBe('pong');
    });
  });
});
