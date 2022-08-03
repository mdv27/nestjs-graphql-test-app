import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './src/cats/cats.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'client'),
        exclude: ['/graphql']
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        typePaths: ['./**/*.graphql'],            
        installSubscriptionHandlers: true,
        playground: true
    })
  ]
})
export class AppModule {}