import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  users = [];

  constructor() { }

  ngOnInit() {
    this.users = [
      { name: 'nombre',
        ocupation: 'web ui dev',
        employed: true
      }
    ];
  }

}
