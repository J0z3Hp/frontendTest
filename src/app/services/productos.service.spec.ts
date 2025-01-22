import { TestBed } from '@angular/core/testing';
import { Productos } from '../interfaces/productos';
import { ProductosService } from './productos.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;
  const datosProducts: Productos = { image: "u9ahsdijahsd", name: "productoTest", price: "$25325" }
  const id = "13213131313"

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  });

  // Caso de prueba 1
  it("Deberia hacer una peticion POST para crear un producto", () => {
    const mockRes = {
      "mensaje": "Se creo el producto correctamente",
    }

    service.postProductos(datosProducts).subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/productos/crear");
    expect(req.request.method).toBe("POST");
    req.flush(mockRes);
  });

  // Caso de prueba 2
  it("Deberia hacer una peticion GET para mostrar los productos", () => {
    const mockProduct = [
      {
        image: "u9ahsdijahsd",
        name: "productoTest",
        price: "$25325"
      },
      {
        image: "u9ahsdijahsdsada",
        name: "productoTest2",
        price: "$34543"
      }
    ];

    const mockRes = {
      "mensaje": "Se encontraron productos almacenados",
      "numeroProducts": mockProduct.length,
      "datos": mockProduct
    }

    service.getProductos().subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/productos/obtener");
    expect(req.request.method).toBe("GET");
    req.flush(mockRes);
  });

  // Caso de prueba 3
  it("Deberia hacer una petición PUT para actualizar un producto correctamente", () => {

    const mockId = "lkfsldk135";

    const mockUpdate: any = {
      image: "afsafasfaf", 
      name: "example", 
      category: "mujer", 
      color: "Verde", 
      talla: "M", 
      price: 10000, 
      stock: 2
    }

    const mockRes = {
      "mensaje": "Se actualizo la camiseta correctamente",
      "datos": mockUpdate
    }

    service.putProductos(mockId, mockUpdate).subscribe(
      (res) => {
        expect(res).toEqual(mockUpdate);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/productos/actualizar/" + mockId);
    expect(req.request.method).toBe("PUT");
    req.flush(mockRes.datos);
  });

  // Caso de prueba 4
  it("Deberia hacer una peticion DELETE para eliminar un producto correctamente", () => {
    const mockId = "j0ij13o2j31";

    const mockRes = {
      "mensaje" : "Se elimino correctamente el producto"
    }

    service.deleteProductos(mockId).subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/productos/eliminar/" + mockId);
    expect(req.request.method).toBe("DELETE");
    req.flush(mockRes) 
  });
});



