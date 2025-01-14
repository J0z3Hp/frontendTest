import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../interfaces/admin';
import { inject } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-administradores',
  standalone: true,
  imports: [NgFor],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.css'
})
export class AdministradoresComponent {
  // 1. Inyectar
  _adminService = inject(AdminService);

  // 2. Declarar las variables
  allAdmins : Admin[] = [];

  // Creacin del metodo para recibir la respuesta de obtener

  // Peticion GET
  getAdmins(){
    this._adminService.getAdmin().subscribe({
      next: (res: any) => {
        console.log("res", res);
        this.allAdmins = res.datos;
        console.log(this.allAdmins);
      },
      error: (err) => {
        console.error("Ocurrio un error", err);
      }
    });
  }

  ngOnInit(){
    this.getAdmins();
  }
}
