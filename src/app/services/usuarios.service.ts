import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _httpClient = inject(HttpClient);

  // URL de nuestros clientes
  private URL_USUARIOS = "http://localhost:9000/usuarios";

  // Peticion POST
  postUsuarios(user: Usuarios){
    return this._httpClient.post(this.URL_USUARIOS + "/crear", user);
  }

  // Peticion GET
  getUsuarios(){
    return this._httpClient.get(this.URL_USUARIOS + "/obtener");
  }
}
