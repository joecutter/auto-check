import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackerNewsController } from './controller/hacker-news/hacker-news.controller';
import { HackerNewsService } from './services/hacker-news.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, HackerNewsController],
  providers: [AppService, HackerNewsService],
})
export class AppModule {}
