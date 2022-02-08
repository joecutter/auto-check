import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ApiResponse } from 'src/dto/response/apiResponse';

@Controller('hacker-news')
export class HackerNewsController {
  constructor(private readonly appService: AppService) {}

  @Get("/last_25")
  queryLast25(): ApiResponse {
    return new ApiResponse(200, true, 'test', null);
  }

  @Get("last_week")
  queryLastWeek(): ApiResponse {
    return new ApiResponse(200, true, 'test', null);
  }

  @Get("user_with_karma")
  queryUserWithKarma(): ApiResponse {
    return new ApiResponse(200, true, 'test', null);
  }
}
