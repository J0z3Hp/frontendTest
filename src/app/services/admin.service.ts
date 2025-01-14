//PARA ESTE SERVICIO SERA LA LOGICA RELACIONADA CON LA CREACIÓN DE ADMINISTRADORES

/* 
Crear administrador
*/

import { Injectable, inject } from '@angular/core';
//Para poder hacer peticiones al back
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admin } from '../interfaces/admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _httpClient = inject(HttpClient);
  // private _router = inject(Router);
  
  //RUTA DE CONEXIÓN

  private URL_ADMIN = 'http://localhost:9000/administradores/';

  //PETICIONES
crearAdmin(admin: Admin){

  return this._httpClient.post(this.URL_ADMIN + '/crear', admin);
}

// Mostrar administradores

getAdmin(){
  return this._httpClient.get(this.URL_ADMIN + '/obtener');
}
}
