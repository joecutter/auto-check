import { Controller, Get } from '@nestjs/common';
import { Message } from 'src/dto/response/apiMessage';
import { ApiResponse } from 'src/dto/response/apiResponse.dto';
import { HackerNewsService } from 'src/services/hacker-news.service';

@Controller('hacker-news')
export class HackerNewsController {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  @Get('/last_25')
  async queryLast25(): Promise<ApiResponse> {
    console.log('\n\nQuery last 25\n\n');
    const result = await this.hackerNewsService.findLast25(25);
    return new ApiResponse(200, true, Message.MSG_RECORD_FOUND, result);
  }

  @Get('last_week')
  async queryLastWeek(): Promise<ApiResponse> {
    console.log('\n\nQuery last week\n\n');
    const result = await this.hackerNewsService.findLastWeek();
    return new ApiResponse(200, true, Message.MSG_RECORD_FOUND, result);
  }

  @Get('user_with_karma')
  async queryUserWithKarma(): Promise<ApiResponse> {
    console.log('\n\nQuery user with karma\n\n');
    const result = await this.hackerNewsService.findUserWithKarma(600);
    return new ApiResponse(200, true, Message.MSG_RECORD_FOUND, result);
  }
}
