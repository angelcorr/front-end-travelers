import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    _id: '',
    name: '',
    surname: '',
    mail: '',
    password: '',
    seguidores: 0
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrarUser() {
    this.auth.registrarUser(this.user).subscribe(res => {
      localStorage.setItem('token', res['accessToken']);
      localStorage.setItem('Nombre', res['user'].name);
      localStorage.setItem('Apellido', res['user'].surname);
      localStorage.setItem('UserId', res['user']._id);
      this.router.navigate(['contenido']);
    });
  }

}
