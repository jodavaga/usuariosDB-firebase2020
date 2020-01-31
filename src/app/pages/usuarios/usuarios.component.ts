import { Component, OnInit, EventEmitter } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

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
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser( user: UsuarioModel, index: number ) {

    Swal.fire({
      title: 'Eliminar',
      html: `¿Seguro desea eliminar usario: <strong>${ user.name } </strong>?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(response => {
      if ( response.value ) {
        console.log('delete:', user);
        this.userService.deleteUser( user ).subscribe();
        this.users.splice(index, 1);
      }
    });
  }

  getFoundUsers( users: UsuarioModel[]) {
    this.users = users;
  }

}
