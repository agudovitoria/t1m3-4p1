import { Module } from '@nestjs/common';
import { TimeModule } from './rest/time/Time.module';

@Module({
    imports: [
        TimeModule,
    ],
    providers: [],
})
export class AppModule {
}
