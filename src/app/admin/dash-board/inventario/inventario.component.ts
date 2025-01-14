import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../../interfaces/productos';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],  
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  // 1. Inyectar
  _productosService = inject(ProductosService);

  // 2. Varibles

  allProducts: Productos[] = [];

  image: string = "";
  name: string = "";
  price: string = "";
  showDiv: boolean = false;
  editMode: boolean = false;  
  editProductId: string | undefined | null= null;


  // Obtener los datos
  getData() {
    this._productosService.getProductos().subscribe({
      next: (res: any) => {
        this.allProducts = res.datos;
        console.log(this.allProducts);
      },
      error: (err) => {
        console.error("Ocurrio un error", err);
      }
    });
  }

  // Crear los datos
  postData() {
    if (this.name === "" || this.image === "" || this.price === "") {
      alert("Ingrese todos los campos para continuar")
    }else{
      // Tienen que ser los mismo que estan en la interface (name, image, price, etc)
      const newProduct: Productos = {
        image: this.image,
        name: this.name,
        price: this.price
      };

      this._productosService.postProductos(newProduct).subscribe({
        next: (res: any) => {
          if(res) {
            console.log("res", res);
            this.getData();
          }else{
            console.error("Ocurrio un error");
          }
        },
        error:(err) => {
          console.error("Ocurrio un error", err);
        }
      });
    }
  }

  // Actualizar productos
  productsId(id: string | undefined) {
    this.editProductId = id;
    this.editMode = true;
    this.showDiv = true;
    console.log(this.editProductId);
  }

  putProduct() {
    console.log("Entre");
    console.log(this.editProductId, this.name, this.image, this.price);

    if(!this.name || !this.image || !this.price) {
      alert("Ingrese todos los campos para continuar");
    }else if(this.editProductId) {
      const upgradedProduct: Productos = {
        image: this.image,
        name: this.name,
        price: this.price
      };

      this._productosService.putProductos(this.editProductId, upgradedProduct).subscribe({ 
        next: (res: any) => {
          if (res) {
            console.log("res", res);
            this.getData();
            this.toggleDiv();
          }else{
            console.error("Ocurrio un error al actualizar");
          }
        },
        error: (err) => {
          console.error("Ocurrio un error al actualizar: ", err);
        }
      });
    }
  }

  // Eliminar productos
  deleteProduct(id: string | undefined) {
    console.log("Producto a borrar es: ", id);

    this._productosService.deleteProductos(id).subscribe({
      next: (res: any) => {
        if (res) {
          console.log("res", res);
          this.getData();
        }else {
          console.error("Ocurrio un error al eliminar");
        }
      },
      error: (err) => {
        console.error("Ocurrio un error: ", err);
      }
    });
  }

  toggleDiv() {
    this.showDiv = !this.showDiv;
    if (!this.showDiv) {
      this.image = "";
      this.name = "";
      this.price = "";
      this.editMode = false;
      this.editProductId = null;
    }
  }

  limpiarCampos() {
    this.name === "";
    this.image === "";
    this.price === "";
  }

  ngOnInit() {
    this.getData();

  }

}
