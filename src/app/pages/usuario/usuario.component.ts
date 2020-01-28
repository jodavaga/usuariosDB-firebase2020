import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

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

        // User to save is equal to dataForm value (without ID)
        this.usuario = {
            // prevent using every field
            ...this.dataForm.value
        };

        if (this.usuario.id) {
            this.userService.updateUser(this.usuario).subscribe( resp => { 
                console.log('Udated:', resp);
            });

        } else {
            this.userService.createUser(this.usuario).subscribe( resp => {
                this.dataForm.get('id').setValue(resp.id);
                console.log('Created:', resp);
            });
        }

    }
}
