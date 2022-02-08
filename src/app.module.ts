import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackerNewsController } from './hacker-news/hacker-news.controller';

@Module({
  imports: [],
  controllers: [AppController, HackerNewsController],
  providers: [AppService],
})
export class AppModule {}
