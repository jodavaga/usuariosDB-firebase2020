import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor( private userService: UsuariosService ) { }

  users: UsuarioModel[] = [];
  usersMatch: UsuarioModel[] = [];
  @Output() usersFound = new EventEmitter();

  ngOnInit() {
    this.getActualUsers();
  }

  getActualUsers() {
    this.userService.getUsuarios().subscribe(resp => {
      this.users = resp;
      console.log(this.users);
    });
  }

  findUsers( termino: string) {
    this.usersMatch = [];
    this.users.filter(element => {
      termino = termino.toLowerCase();
      const nameTmp = element.name.toLowerCase();
      const ocupationTmp = element.ocupation.toLowerCase();
      if ( nameTmp.includes(termino) || ocupationTmp.includes(termino)) {
        this.usersMatch.push(element);
      }
    });
    this.usersFound.emit(this.usersMatch);
    if (!termino) {
      this.usersMatch = [];
      this.getActualUsers();
      setTimeout( () => {
        console.log('empty', this.users);
        this.usersFound.emit( this.users );
      }, 1000);
    }
  }

}
