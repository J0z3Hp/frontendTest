import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Admin } from '../../../interfaces/admin';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NavBarComponent],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.css'
})
export class RegistroAdminComponent {


  _adminService = inject(AdminService);
  _toastrService = inject(ToastrService);
  _Router = inject(Router);

  formularioRegistroAdmin = new FormGroup({

    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')

  });

  handleSubmint() {
    //Lo que queremos en este caso es que me muestre en consola la información que se esta reciviendo del formulario


    const name = this.formularioRegistroAdmin.value.name;
    const email = this.formularioRegistroAdmin.value.email;
    const password = this.formularioRegistroAdmin.value.password;

    let CredencialesRegistroAdmin: Admin | null = null;


    if (typeof name === 'string' && typeof email === 'string' && typeof password === 'string') {

      CredencialesRegistroAdmin = {

        name,
        email,
        password

      }
    }

    if (CredencialesRegistroAdmin) {
      this._adminService.crearAdmin(CredencialesRegistroAdmin).subscribe({
        next: (res: any) => {
          console.log(res);

          this._toastrService.success(res.mensaje);

          this._Router.navigate(['/loginAdmin']);

        },

        error: (err) => {
          console.log(err.error.mensaje);
          this._toastrService.error(err.error.mensaje || 'Ocurrio un error al registrar el usuario');
          this.formularioRegistroAdmin.reset();
        }

      })
    }
  }
}

