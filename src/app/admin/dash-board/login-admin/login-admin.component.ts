import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NavBarComponent } from "../../../components/nav-bar/nav-bar.component";
import { CredencialesAdminService } from '../../../services/login.service';
import { CredencialesAdmin } from '../../../interfaces/credenciales-admin';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NavBarComponent],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  //Inicialmente injectamos dependencias
  _credencialesAdminService = inject(CredencialesAdminService);
  _toastrService = inject(ToastrService);
  _Router = inject (Router);

  //CONEXIÓN DEL FORMULARIO

  formularioLoginAdmin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  handleSubmint() {

    const emailLoginAdmin = this.formularioLoginAdmin.value.email;
    const passwordLoginAdmin = this.formularioLoginAdmin.value.password;

    let CredencialesIngreso: CredencialesAdmin | null = null;

    if (typeof emailLoginAdmin === 'string' && typeof passwordLoginAdmin === 'string') {

      CredencialesIngreso = {

        emailLoginAdmin,
        passwordLoginAdmin

      }
    }

    // GESTION PARA LA PETICIÓN POST PARA REALIZAR PETICIÓN AL BACK

    if (CredencialesIngreso) {
      this._credencialesAdminService.inicioSesionAdmin(CredencialesIngreso).subscribe({
        next: (res: any) => {
          console.log(res)
          if (res) {
            localStorage.setItem('token', res.tokenGenerado);
            this._Router.navigate(["/dashBoard"]);
            // this._credencialesAdminService.redireccionar();
            this._toastrService.success(res.mensaje);
          }
        },

        error: (err) => {
          console.log(err.error.mensaje);
          this._toastrService.error(err.error.mensaje || 'Ocurrio un error al iniciar sesión');
          this.formularioLoginAdmin.reset();
        }

      })
    }
  }

}
