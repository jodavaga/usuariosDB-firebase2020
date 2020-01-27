import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://usuariosdb-2020.firebaseio.com';
  usuarios: UsuarioModel[] = [];

  constructor( private http: HttpClient ) {
  }

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get(`${ this.url }/usuarios.json`).pipe(
      map((users: UsuarioModel[]) => users)
    );
  }

  createUser( user: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios.json`, user);
  }

  updateUser( user: UsuarioModel ) {
    return this.http.put(`${this.url}.json`, user);
  }
}
