import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserMiddleware } from './utility/middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule,ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
