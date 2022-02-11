import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class HackerNewsService {
  constructor(private http: HttpService) {}

  findMaxId(): any {
    return this.http
      .get('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty')
      .pipe(
        map((response) => {
          // console.log('MaxId found ', response.data);
          return response.data;
        }),
      );
  }

  findTopStories(): any {
    return this.http
      .get(
        ' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      )
      .pipe(
        map((response) => {
          // console.log('Top stories found ', response.data);
          //sort from backwards
          return response.data.sort((a, b) => b - a);
        }),
      );
  }

  findItemById(id: number): any {
    return this.http
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .pipe(
        map((response) => {
          // console.log('Fetched Item ', response.data);
          return response.data;
        }),
      );
  }

  findUserById(id: number): any {
    return this.http
      .get(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`)
      .pipe(
        map((response) => {
          // console.log('Fetched Item ', response.data);
          return response.data;
        }),
      );
  }

  async findLast25(noOfItems: number): Promise<any> {
    console.log('Last 25 service');

    let counter = 1;
    let stories = [];
    let items = [];

    let topStories = await this.findTopStories().toPromise();

    // console.log('topStories Ids ', topStories);

    for (let i of topStories) {
      // console.log('i ', i);
      console.log('counter ', counter++);

      items = await this.findItemById(i).toPromise();

      // console.log('items ', items['title']);

      stories.push(items['title']);

      if (counter === noOfItems) {
        console.log('counter done', counter);
        console.log('stories done', stories);
        let recursiveSearch = this.mergeCharacters(stories);
        return recursiveSearch;
      }
    }
  }

  async findLastWeek(): Promise<any> {
    console.log('Last week service');

    let item;
    let stories = [];

    let weekAgo = moment().subtract(1, 'w').valueOf();

    // console.log('A week ', weekAgo);

    let topStoriesId = await this.findTopStories().toPromise();

    // console.log('topStories Ids ', topStoriesId);

    for (let i of topStoriesId) {
      item = await this.findItemById(i).toPromise();

      // console.log('Story ', item);

      //check dates
      if (item.time <= weekAgo) {
        console.log('Last week post ', item);
        stories.push(item.title);
      }

      //terminate at 10 stories
      if (stories.length > 10) {
        console.log('stories done', stories);
        let recursiveSearch = this.mergeCharacters(stories);
        return recursiveSearch;
      }
    }
  }

  async findUserWithKarma(noOfItems: number): Promise<any> {
    console.log('User with karma');

    let counter = 1;
    let stories = [];
    let user;
    let items;

    let topStoriesId = await this.findTopStories().toPromise();

    // console.log('topStories Ids ', topStoriesId);

    for (let i of topStoriesId) {
      console.log('counter ', counter++);

      items = await this.findItemById(i).toPromise();

      // console.log('items ', items);

      user = await this.findUserById(items.by).toPromise();

      // console.log('User ', user);

      if (user.karma >= 10000) {
        stories.push(items['title']);
      }

      if (counter === noOfItems) {
        console.log('counter done', counter);
        console.log('stories done', stories);
        let recursiveSearch = this.mergeCharacters(stories);
        return recursiveSearch;
      }
    }
  }

  mergeCharacters(arr) {
    let titles = [];
    for (let i = 0; i < arr.length; i++) {
      let split = arr[i].split(' ');

      split.forEach((item) => titles.push(item));
    }

    // console.log('One big array ', titles);

    return this.recursiveSearch(titles);
  }

  recursiveSearch(arr) {
    const arry = arr.map((item) => item.toUpperCase());
    console.log('normal ', arry);

    let sorted_arr = arry.slice().sort();
    let results = [];
    let finalResult = new Set();

    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        finalResult.add(sorted_arr[i]);
      }
    }

    //unique values
    //get 10

    for (let j of [...new Set(finalResult)]) {
      results.push(j);

      if (results.length === 10) {
        return results;
      }
    }

    return results;
  }

  toFindDuplicates(arr) {
    const modArr = arr.map((item) => {
      return item.toUpperCase();
    });

    let toMap = {};
    let resultToReturn = false;

    for (let i = 0; i < modArr.length; i++) {
      if (toMap[modArr[i]]) {
        resultToReturn = true;
        // terminate the loop
        break;
      }

      //10 items
      if (Object.keys(toMap).length === 10) {
        console.log('10 dup found ', toMap);
        return toMap;
      }

      toMap[modArr[i]] = true;

      if (resultToReturn) {
        console.log('Duplicate elements exist');
      } else {
        console.log('Duplicates dont exist ');
      }
    }

    return toMap;
  }
}
