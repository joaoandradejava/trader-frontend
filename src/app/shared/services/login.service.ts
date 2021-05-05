import { Backend } from './../utils/backend';
import { Login } from './../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public realizarLogin(login: Login): Observable<any> {
    return this.http.post(`${Backend.getBaseLogin}`, login);
  }
}
