import { Component, OnInit } from '@angular/core';
import { Page } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pagina-crear',
  templateUrl: './pagina-crear.component.html',
  styleUrls: ['./pagina-crear.component.css']
})

export class PaginaCrearComponent implements OnInit {
  
  page: Page = {
    _id: '',
    nombre: '',
    mail: '',
    password: '',
    description: '',
    categoria: '',
    seguidores: 0
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrarPage() {
    this.auth.registrarPage(this.page).subscribe(res => {
      localStorage.setItem('token', res['accessToken']);
      localStorage.setItem('Nombre', res['page'].nombre);
      localStorage.setItem('Descripcion', res['page'].description);
      localStorage.setItem('Categoria', res['page'].categoria);
      localStorage.setItem('Mail', res['page'].mail);
      this.router.navigate(['contenido']);
    });
  }

 }
