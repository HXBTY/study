import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// NestExpressApplication 用来支持静态资源的请求
import { NestExpressApplication } from "@nestjs/platform-express";
import {NextFunction} from "express";
import {LoginGuard} from "./login.guard";
import {TimeInterceptor} from "./time.interceptor";
import {ValidatePipe} from "./validate.pipe";

async function bootstrap() {
  // NestExpressApplication 需要设置为泛型
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets("public", {prefix: "/static"})
  // 配置跨域
  app.enableCors({
    origin: true
  })
  // 全局中间件 在请求收到请求后与响应请求前进行操作
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log("global-middleware-before")
    next()
    console.log("global-middleware-after")
  })
  // 全局路由守卫
  // app.useGlobalGuards(new LoginGuard())
  // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor())
  // 全局管道 Pipe
  // app.useGlobalPipes(new ValidatePipe())
  await app.listen(3000);
}
bootstrap();
