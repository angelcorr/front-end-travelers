import { Component, OnInit, Input } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { User, Fotos } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-tarjeta2',
  templateUrl: './tarjeta2.component.html',
  styleUrls: ['./tarjeta2.component.css']
})
export class Tarjeta2Component implements OnInit {

  IdUserSesion = '';

  foto: Fotos = {
    _id: '',
    nombre: '',
    descripcion: '',
    albumId: '',
    userId: '',
    ruta: '',
    likes: 0,
    imagen: null,
    publico: false,
    views: 0
  };

  user: User = {
    _id: '',
    name: '',
    surname: '',
    password: '',
    mail: '',
    seguidores: 0
  };

  idUser = '';

  @Input() fotos: Fotos[];

  constructor(private redSocial: RedSocialService,
    private auth: AuthService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {

      
    })
  };

  ngOnInit() {
    setTimeout(() => {
      this.getUsuario();
      this.IdUserSesion = localStorage.getItem('UserId');
    }, 1000);
  }

  getUsuario() {
    this.redSocial.getUser(this.idUser).subscribe((res: User) => {
      this.user = res;
      console.log(res);
    });
   }

  mostrarFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

}
