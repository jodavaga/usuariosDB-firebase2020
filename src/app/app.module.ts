import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
