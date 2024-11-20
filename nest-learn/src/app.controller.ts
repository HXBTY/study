import {Controller, Get, Query, UseFilters, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import { AppService } from './app.service';
import {LoginGuard} from "./login.guard";
import {TimeInterceptor} from "./time.interceptor";
import {ValidatePipe} from "./validate.pipe";
import {TestFilter} from "./test.filter";

@Controller()
// @UseInterceptors(TimeInterceptor) 在这里使用可以作用与当前整个controller下的接口
// @UsePipes(ValidatePipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  // @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  getHello(): string {
    console.log("handle-getHello")
    return this.appService.getHello();
  }
  @Get("say")
  @UseFilters(TestFilter)
  say(@Query("num", ValidatePipe) num: number) {
    return num + 1
  }
}
