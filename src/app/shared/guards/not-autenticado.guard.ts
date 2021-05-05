import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class NotAutenticadoGuard implements CanActivate {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.autenticacaoService.isAutenticado()) {
      this.router.navigate(['home']);

      return false;
    }

    return true;
  }
}
