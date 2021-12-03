import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    _id: '',
    name: '',
    surname: '',
    mail: '',
    password: '',
    seguidores: 0
  };

  errorPassword = false;
  mensajeError = '';

  constructor(private auth: AuthService, private router: Router) { }
  
  ngOnInit() {
  }
  
  
  login() {
    
    this.auth.loginUser(this.user).subscribe(res => {
      localStorage.setItem('token', res['accessToken']);

      localStorage.setItem('Nombre', res['user'].name);

      localStorage.setItem('Apellido', res['user'].surname);

      localStorage.setItem('UserId', res['user']._id);

      localStorage.setItem('Correo', res['user'].mail);
      this.router.navigate(['contenido']);
    }, err => {
      if (err.error.massaje === 'Contraseña incorrecta') {
        this.errorPassword = true;
        this.mensajeError = 'password incorrecto.';
      } else if (err.error.massaje === 'Usuario no encontrado') {
        this.errorPassword = true;
        this.mensajeError = 'usuario no encontrado, el correo que colocó no se encuentra registrado.';
      }
    });
  }

}
