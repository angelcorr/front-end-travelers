import { Component, OnInit, Input } from '@angular/core';
import { User, Fotos } from 'src/app/interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  user: User = {
    _id: '',
    name: '',
    surname: '',
    password: '',
    mail: '',
    seguidores: 0
  };

  @Input() fotos: Fotos[];

  constructor(private redSocial: RedSocialService,
     private auth: AuthService, private activatedRouter: ActivatedRoute, private router: Router) { 
      activatedRouter.params.subscribe(params => {
        if (params['id']) {
          redSocial.getUser(params['id']).subscribe((res: User) => {
            this.user = res;
            console.log(res);
          });
  
        } else {
          redSocial.getThisUser().subscribe((res: User) => {
            this.user = res;
            console.log(res);
           });
        }
      })
    };

  ngOnInit() {
  }

  deleteFoto(id: string) {
    if (confirm('Estas seguro de que quieres borrar')) {
      return this.redSocial.deleteFoto(id).subscribe(res => {
        this.fotos = this.fotos.filter(foto => foto._id !== res._id);
      });

    }
  }

  verFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

  editFoto(id: string) {
    this.router.navigate(['foto', 'edit', id]);
  }

}
