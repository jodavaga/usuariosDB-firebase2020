import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {

    dataForm: FormGroup;
    usuario: UsuarioModel = new UsuarioModel();

    constructor( private userService: UsuariosService ) {

        // Form data
        this.dataForm = new FormGroup({
            id: new FormControl(),
            name: new FormControl('', Validators.required),
            ocupation: new FormControl('', Validators.required),
            employed: new FormControl(true, Validators.required)
        });
    }

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
            });
        });

    }
}
