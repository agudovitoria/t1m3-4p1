import { Module } from '@nestjs/common';
import { TimeModule } from './rest/time/Time.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'src', 'config', 'database.ts')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT'), 10),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
      }),
        inject: [ConfigService],
    }),
    TimeModule,
    // ConceptModule,
  ],
})
export class AppModule {
}
