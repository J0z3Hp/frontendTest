import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { inject } from '@angular/core';
import { Productos } from '../../interfaces/productos';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-mujer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './page-mujer.component.html',
  styleUrl: './page-mujer.component.css'
})
export class PageMujerComponent {
    // 1. Inyeccion de servicios
    _productosService = inject(ProductosService)

    // 2. Declarar las varibales
    allProducts : Productos[] = [];
  
    // 3. Creacion de metodos para recibir la respuesta

    // Peticion GET
    //  VERIFICAR FILTRO DE CATEGORIA HOMBRE-MUJER
  getProducts(){
    this._productosService.getProductos().subscribe(
      {
        // Manejo de errores con next y error
        next: (res: any) => {
          this.allProducts = res.datos;
          console.log(this.allProducts);
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  ngOnInit(){
    this.getProducts();
  }
}
