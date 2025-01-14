import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CredencialesAdminService } from '../../services/login.service';
import { Credenciales } from '../../interfaces/credenciales';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  //Inicialmente injectamos dependencias
  _credencialesAdminService = inject(CredencialesAdminService);
  _toastrService = inject(ToastrService);

  //Conectamos formulario:

  formularioLogin = new FormGroup({
    email : new FormControl(''),
    password: new FormControl('')
  });

  //Es una función que me controla lo que suceda on el formulario l dar click en el botn submit
  handleSubmint(){
    //Lo que queremos en este caso es que me muestre en consola la información que se esta reciviendo del formulario


    const emailLoginUser = this.formularioLogin.value.email;
    const passwordLoginUser = this.formularioLogin.value.password;


   let CredencialesIngreso: Credenciales | null = null;


   if(typeof emailLoginUser === 'string' && typeof passwordLoginUser === 'string'){

    CredencialesIngreso = {
      
      emailLoginUser,
      passwordLoginUser
      
    }

   }

   // GESTION PARA LA PETICIÓN POST PARA REALIZAR PETICIÓN AL BACK

   if(CredencialesIngreso){
    this._credencialesAdminService.inicioSesionUsuario(CredencialesIngreso).subscribe({
      next: (res: any) => {
        console.log(res)
        if(res){
          localStorage.setItem('token', res.tokenGenerado)
          this._credencialesAdminService.redireccionar();
          this._toastrService.success(res.mensaje);
        }
      },

      error: (err) =>{
        console.log(err.error.mensaje);
        this._toastrService.error(err.error.mensaje || 'Ocurrio un error al iniciar sesión');
        this.formularioLogin.reset();
      }
    })
   }
  }
}
