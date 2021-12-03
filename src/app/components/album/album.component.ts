import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Album, Fotos } from 'src/app/interfaces/interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  fotos: Fotos[] = [];
  album: Album = {
    _id: '',
    nombre: '',
    description: '',
    user_id: ''
  };

  foto: Fotos = {
    _id: '',
    nombre: '',
    publico: false,
    userId: '',
    descripcion: '',
    albumId: '',
    imagen: null,
    ruta: '',
    likes: 0,
    views: 0
  };

  fotoSelecionada: ArrayBuffer | String;


  constructor(private redSocial: RedSocialService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(params => {
      this.foto.albumId = params['id'];
      redSocial.getAlbum(params['id']).subscribe((res: Album) => {
        this.album = res;
      });

      redSocial.getImagenesAlbum(params['id']).subscribe((res: Fotos[]) => {
        this.fotos.push(...res);
        console.log(res);
      });
    });
   }

  ngOnInit() {
  }

  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.foto.imagen = event.target.files[0];

      // image preview
      const reader = new FileReader();
      reader.onload = e => this.fotoSelecionada = reader.result;
      reader.readAsDataURL(this.foto.imagen);
    }
  }

  subirFoto() {
    this.redSocial.subirFoto(this.foto).subscribe((res: Fotos) => {
      this.fotos.push(res);
    });
  }

  verFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

  deleteFoto(id: string) {
    if (confirm('Estas seguro de que quieres borrar')) {
      return this.redSocial.deleteFoto(id).subscribe(res => {
        this.fotos = this.fotos.filter(foto => foto._id !== res._id);
      });

    }
  }

}
