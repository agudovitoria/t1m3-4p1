import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeModule } from './time.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    TimeModule,
    RMQModule.forRoot({
      exchangeName: 'default',
      connections: [
        {
          login: 'guest',
          password: 'guest',
          host: 'localhost',
        },
      ],
      queueName: 'times',
    }),
  ],
})
export class AppModule {
  constructor(configService: ConfigService) {
    // tslint:disable-next-line:no-console
    console.debug(configService.get('AMQP_TOPIC_TIMES'));
  }
}
