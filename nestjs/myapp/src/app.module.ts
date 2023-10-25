import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestedService } from './nested.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NestedService],
})
export class AppModule {}
