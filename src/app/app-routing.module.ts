import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const APP_ROUTES: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'usuarios' }
];


@NgModule({
  imports: [
    RouterModule.forRoot( APP_ROUTES )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
