import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

    dataForm: FormGroup;
    usuario: UsuarioModel = new UsuarioModel();

    constructor( private userService: UsuariosService,
                 private route: ActivatedRoute,
                 private navigation: Router
                ) {

        // Form data
        this.dataForm = new FormGroup({
            id: new FormControl(),
            name: new FormControl('', Validators.required),
            ocupation: new FormControl('', Validators.required),
            employed: new FormControl(true)
        });
    }

    ngOnInit() {
      // get PARAMS from url
      const id = this.getRouteParam();

      if (id !== 'nuevo') {
          this.userService.getUser(id).subscribe((resp: UsuarioModel) => {
              this.usuario = resp;
              this.usuario.id = id;
              // set form values from the user info
              this.dataForm.setValue({
                  ...this.usuario
              });
          });
      }
    }

    getRouteParam():string {
        return this.route.snapshot.params.id;
    }

    // Save form data, edition mode or creating new user
    saveForm() {
        if (this.dataForm.invalid) {
            console.log('Forma NO valida');
            return;
        }

        Swal.fire({
            title: 'Saving',
            text: 'Saving information',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false
        });
        Swal.isLoading();

        // User to save is equal to dataForm value (without ID)
        this.usuario = {
            // prevent using every field
            ...this.dataForm.value
        };

        let peticion: Observable<any>;

        if (this.usuario.id) {
            peticion = this.userService.updateUser(this.usuario);
        } else {
            peticion = this.userService.createUser(this.usuario);
        }

        // Subscribe to what ever be the petition
        peticion.subscribe( resp => {
            this.dataForm.get('id').setValue(resp.id);
            Swal.fire({
                title: resp.name,
                text: 'Saved correctly',
                icon: 'success'
            }).then( resp => {
                const routeParam = this.getRouteParam();

                if (resp && routeParam === 'nuevo') {
                    this.dataForm.reset();
                    this.usuario = new UsuarioModel();
                    // Navigate to usuarios due to edition succesfull
                } else if (resp && routeParam !== 'nuevo') {
                    this.navigation.navigate(['/usuarios']);
                }
            });
        });

    }
}
