import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  users: UsuarioModel[] = [];
  loading = true;

  constructor( private userService: UsuariosService) { }

  ngOnInit() {
    this.userService.getUsuarios().subscribe( users => {
      console.log(users);
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser( userId: string, index: number ) {
    this.userService.deleteUser( userId ).subscribe(resp => {
      this.users.splice(index, 1);
    });
  }

}
