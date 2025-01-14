import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../interfaces/usuarios';
import { NgFor } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  // 1. Inyectar
  _usuariosService = inject(UsuariosService);

  // 2. Declarar las variables
  allUsuarios : Usuarios[] = [];

  // Creacion del metodo para recibir la respuesta

  // Peticion GET
  getUsuarios(){
    this._usuariosService.getUsuarios().subscribe({
      next: (res: any) => {
        console.log("res", res);
        this.allUsuarios = res.datos;
        console.log(this.allUsuarios);
      },
      error: (err) => {
        console.error("Ocurrio un error", err);
      }
    });
  }

  ngOnInit(){
    this.getUsuarios();
  }
}


