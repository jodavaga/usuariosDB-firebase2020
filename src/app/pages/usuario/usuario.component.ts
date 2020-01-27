import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {

    dataForm: FormGroup;

    constructor( private userService: UsuariosService ) {

        // Form data
        this.dataForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', Validators.required),
            ocupation: new FormControl('', Validators.required),
            status: new FormControl(true, Validators.required)
        });
    }

    saveForm() {
        console.log(this.dataForm);
        console.log(this.dataForm.value);

        this.userService.createUser(this.dataForm.value).subscribe( resp => {
            console.log(resp);
        });
    }
}
