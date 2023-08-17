import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule, DatabaseService } from '@app/database';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SseModule } from './sse/sse.module';
import { GraphqlModule } from './graphql/graphql.module';
import { join } from 'path';

@Module({
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/graphql.schema.gql'),
    }),
    SseModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
