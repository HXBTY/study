import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { CirculateAModule } from './circulate-a/circulate-a.module';
import { CirculateBModule } from './circulate-b/circulate-b.module';

@Module({
  imports: [PersonModule, CirculateAModule, CirculateBModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 通过在IoC中声明全局守卫 {provide: APP_GUARD, useClass: LoginGuard}
    // {provide: APP_GUARD, useClass: LoginGuard},
    // 声明全局拦截器 {provide: APP_INTERCEPTOR, useClass: TimeInterceptor}
    { provide: APP_INTERCEPTOR, useClass: TimeInterceptor },
    // 声明全局Pipe {provide: APP_PIPE, useClass: ValidatePipe},
    // {provide: APP_PIPE, useClass: ValidatePipe},
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 对指定路由添加中间件
    consumer.apply(LogMiddleware).forRoutes('hello*');
  }
}
