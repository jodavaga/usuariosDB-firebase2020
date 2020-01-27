import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {

    dataForm: FormGroup;

    constructor() {

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
    }
}
