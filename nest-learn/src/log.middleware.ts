import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * 路由中间件
 */
@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("router-middleware-before")
    next();
    console.log("router-middleware-after")

  }
}
