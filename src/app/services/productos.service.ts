import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _httpClient = inject(HttpClient);

  // URL DE LAS CAMISETAS
  private URL_PRODUCTOS = "http://localhost:9000/productos";

  // Peticion POST
  postProductos(product: Productos){
    return this._httpClient.post(this.URL_PRODUCTOS + "/crear", product);
  }

  // Peticion GET
  getProductos(){
    return this._httpClient.get(this.URL_PRODUCTOS + "/obtener");
  }

  // Peticion PUT
  putProductos(id: string | undefined, productPut: Productos ){
    return this._httpClient.put(this.URL_PRODUCTOS + "/actualizar/" + id, productPut);
  }

  // Peticion DELETE
  deleteProductos(id: string | undefined){
    return this._httpClient.delete(this.URL_PRODUCTOS + "/eliminar/" + id);
  }
} 
