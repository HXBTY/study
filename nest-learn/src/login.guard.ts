import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AppService} from "./app.service";

/**
 * 路由首位 guard 返回false即无权限访问 403
 */
@Injectable()
export class LoginGuard implements CanActivate {

  @Inject(AppService)
  private appService: AppService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("login-guard", this.appService.getHello())
    return false;
  }
}
