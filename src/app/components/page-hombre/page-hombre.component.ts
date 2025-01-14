import { Component, inject } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
//Para usar dependencias y servicios, se necesita metodo inject
import { Inject } from '@angular/core';
//Importamos ngx-toastr para dar mensajitos de respuesta
import { ToastrService } from 'ngx-toastr';
//Me permite mantener la estructura de mis productos
import { Productos } from '../../interfaces/productos';
//importar el NGFOR -> para poder usar el ciclo for en html
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-hombre',
  standalone: true,
  imports: [NgFor],
  templateUrl: './page-hombre.component.html',
  styleUrl: './page-hombre.component.css'
})
export class PageHombreComponent {

  _productosService = inject(ProductosService);
  _toastrService = inject(ToastrService);

  allProductos : Productos[] = [];

  obtenerProuctos(){

    this._productosService.getProductos().subscribe(
      {
        //Gestionar la respuesta de esta petición
        //Manejo de errores

        next: (res: any) => {
          //Acá es cuando todo sale bien
          this.allProductos = res.datos;
          console.log(this.allProductos);
        },
        error: (error: any) => {
          // Acá es cuando algo salio mal
          console.log(error);
        }
      }
    );

  }
  ngOnInit(){
    this.obtenerProuctos();
  }

  crearProductos(){

    // this._productosService.postProductos().subscribe(
    //   {

    //     //Manejo de errores

    //     next: (res: any) => {
          
          

        }
      }
//     )
//   }

// }
