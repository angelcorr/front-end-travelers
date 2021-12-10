import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';
import { AuthService } from 'src/app/services/auth.service';
import { Fotos } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit, DoCheck {
  nombre: string;
  apellido: string;

  fotos: Fotos[] = [];

  loading = false;

  constructor(private router: Router, private auth: AuthService, private redSocial: RedSocialService) {
  }

  ngOnInit() {
    this.redSocial.getContenido().subscribe((res: Fotos[]) => {
      this.fotos.push(...res);
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

  ngDoCheck() {
    this.nombre = localStorage.getItem('Nombre');
    this.apellido = localStorage.getItem('Apellido');
  }

}
