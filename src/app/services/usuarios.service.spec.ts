import { TestBed } from '@angular/core/testing';
import { Usuarios } from '../interfaces/usuarios';
import { UsuariosService } from './usuarios.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing"; 

describe('UsuariosService', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  const datosUsers : Usuarios = {email: "test@gmail.com", fullName: "test", password: "123"}
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [
        UsuariosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ] 
    });
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify(); 
  });

  // Caso de prueba 1
  it("Deberia hacer la peticion POST para crear un usuario", () => {
    const mockRes = {
      "mensaje" : "Se creo correctamente el ususario"
    }

    service.postUsuarios(datosUsers).subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/usuarios/crear");
    expect(req.request.method).toBe("POST");
    req.flush(mockRes);
  });

  // Caso de prueba 2
  it("Deberia hacer una peticion GET para mostrar a todos los usuarios", () => {
    const mockUser = [
      {
        "fullName" : "pepito",
        "email" : "test@example.com",
        "password" : "121241"
      },
      {
        "fullName" : "pepito2",
        "email" : "test2@example.com",
        "password" : "1212"
      }
    ];

    const mockRes = {
      "mensaje" : "Se encontraron estos usuarios almacenados",
      "numeroUsuario" : mockUser.length,
      "datos" : mockUser
    }

    service.getUsuarios().subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httpMock.expectOne("http://localhost:9000/usuarios/obtener");
    expect(req.request.method).toBe("GET");
    req.flush(mockRes);
  });
});
