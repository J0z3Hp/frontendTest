import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";
import { CredencialesAdmin } from '../interfaces/credenciales-admin';
import { Credenciales } from '../interfaces/credenciales';


@Injectable({
  providedIn: 'root'
})
export class CredencialesAdminService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  public _toastrService = inject(ToastrService);

//Creación de ruta de conexión al Back

private URL_LOGINADMIN = 'http://localhost:9000/inicarSesionAdmin/';
private URL_LOGIN = 'http://localhost:9000/iniciarSesion/';

// Iniciamos peticiones

inicioSesionAdmin(credencialesAdmin:CredencialesAdmin){

  return this._httpClient.post(this.URL_LOGINADMIN, credencialesAdmin);

}

inicioSesionUsuario(credencialesUsuario:Credenciales){

  return this._httpClient.post(this.URL_LOGIN, credencialesUsuario);

}

obtenerToken(){
  return localStorage.getItem('token');
}

esAdmin(){
  const token = this.obtenerToken();

  if(token){
    const decodificado: any =jwtDecode(token);

    return decodificado.isAdmin? true : false;
  }else {
    console.error('No se encontro token');
    return false
  }
}

  redireccionar(){
    if(this.esAdmin()){
      this._router.navigate(['DashBoard']);
    }else{
      this._router.navigate(['/']);
    }
  }


  //INICIO DE SESIÓN SATISFACTORIO

  estaLogueado(){
    return this.obtenerToken()? true : false;
  }

  //CIERRE DE SESIÓN

  cierreSesion(){
    this._toastrService.info('Cierre de sesión exitoso, gracias por tú visita');

    localStorage.removeItem('token');

    this._router.navigate(['/inicioSesion']);

    

  }
}
