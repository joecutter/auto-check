import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackerNewsService],
    }).compile();

    service = module.get<HackerNewsService>(HackerNewsService);
  });

  it('should be return duplicates', () => {
    const arr = [
      'Is',
      'it',
      'even',
      'worth',
      'working',
      'on',
      'FOSS',
      'anymore?',
      'Betty',
      'Davis',
      'has',
      'died',
      'Seals',
      'are',
      'dying',
      'in',
      'droves',
      'along',
      'South',
      "Africa's",
      'coast',
      'Video',
      'shows',
      'SpaceX',
      'satellites',
      'burning',
      'up',
      'due',
      'to',
      'solar',
      'storm',
    ];
    const dups = service.toFindDuplicates(arr);

    expect(dups).not.toBeNull()
  });
});
