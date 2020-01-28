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

  constructor( private http: HttpClient ) {
  }

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get(`${ this.url }/usuarios.json`).pipe(
      map((users: UsuarioModel[]) => users)
    );
  }

  createUser( user: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post(`${this.url}/usuarios.json`, user).pipe(
      map( (resp: any) => {
        user.id = resp.name;
        console.log('ID:', user.id);
        return user;
      })
    );
  }

  updateUser( user: UsuarioModel ) {

    // No needed to created ID field on database after update
    const userTemp = {
      ...user
    };

    delete userTemp.id;

    return this.http.put(`${this.url}/usuarios/${user.id}.json`, userTemp);
  }
}
