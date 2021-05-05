import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public isAutenticado(): boolean {
    return this.autenticacaoService.isAutenticado();
  }

  public isAdmin(): boolean {
    return this.autenticacaoService.isAdmin();
  }

  public sair(): void {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
