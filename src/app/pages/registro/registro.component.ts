import { Component, inject } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavBarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  _usuariosService = inject(UsuariosService);
  _toastrService = inject(ToastrService);
  _Router = inject(Router);

  formularioRegistro = new FormGroup({

    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  //Es una función que me controla lo que suceda on el formulario l dar click en el botn submit
  handleSubmint() {
    //Lo que queremos en este caso es que me muestre en consola la información que se esta reciviendo del formulario

    

    const fullName = this.formularioRegistro.value.fullName;
    const email = this.formularioRegistro.value.email;
    const password = this.formularioRegistro.value.password;

    


    let CredencialesRegistro: Usuarios | null = null;


    if (typeof fullName === 'string' && typeof email === 'string' &&  typeof password === 'string') {

      CredencialesRegistro = {

        fullName,
        email,
        password

      }
  
    }
    

    if (CredencialesRegistro) {
      this._usuariosService.postUsuarios(CredencialesRegistro).subscribe({
        next: (res: any) => {
          console.log(res);

          // if(res){
          //   localStorage.setItem('CredencialesRegistro', JSON.stringify(CredencialesRegistro));
          // }

          this._toastrService.success(res.mensaje);

          this._Router.navigate(['/inicioSesion']);
        },

        error: (err) => {
          console.log(err.error.mensaje);
          this._toastrService.error(err.error.mensaje || 'Ocurrio un error al registrar el usuario');
          this.formularioRegistro.reset();
        }

      })
    }



  }
}
