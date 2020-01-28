import { Component, OnInit } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  users: UsuarioModel[] = [];

  constructor( private userService: UsuariosService) { }

  ngOnInit() {
    this.userService.getUsuarios().subscribe( users => {
      console.log(users);
      this.users = users;
    });
  }

}
