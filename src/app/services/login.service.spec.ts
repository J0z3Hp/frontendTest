import { TestBed } from '@angular/core/testing';
import { CredencialesAdmin } from '../interfaces/credenciales-admin';
import { Credenciales } from '../interfaces/credenciales';
import { CredencialesAdminService } from './login.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe("Pruebas para servicio login", () => {
  let service: CredencialesAdminService;
  let httMock : HttpTestingController;
  const urlLogin = "http://localhost:9000/iniciarSesion/";
  const urlLoginAdmin = "http://localhost:9000/inicarSesionAdmin/";
  const datosUsers : Credenciales = {emailLoginUser: "test@gmail.com", passwordLoginUser: "123"}
  const tokenTest = "asdagasa124fas";
  const datosAdmin : CredencialesAdmin = {emailLoginAdmin: "adminTest@gmail.com", passwordLoginAdmin: "passwordAdmin"}
  const tokenAdminTest = "gdfgdeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDE0NGZhMzViOWM4ZGU4MzM0OWJjMyIsIm5hbWUiOiJQcnVlYmEgZGUgYXV0ZW50aWNhY2nDs24iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzQ1NzE3NTUsImV4cCI6MTczNDU3ODk1NX0.gS-tGOZoUQVswkmLOtXqvHUA0iVbPyfOOXvlwxFhTF0";


  beforeEach(() => {
    let _mockToastrService = jasmine.createSpyObj('ToastrService', ['info']);
    let _mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({ 
      providers: [
        CredencialesAdminService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: Router, useValue: _mockRouter},
        {provide: ToastrService, useValue: _mockToastrService}
      ] 
    });

    service = TestBed.inject(CredencialesAdminService);
    httMock = TestBed.inject(HttpTestingController);
  });

  // Verificar que no quedan peticiones pendientes
  afterAll(() => {
    httMock.verify();
  });

  // Caso de prueba 1
  it("Deberia hacer una peticion POST para iniciar sesion el admin", () => {
    const mockRes = {
      "mensaje" : "Inicio de sesion exitoso admin",
      "token" : tokenTest
    }

    service.inicioSesionAdmin(datosAdmin).subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httMock.expectOne(urlLoginAdmin);
    expect(req.request.method).toBe("POST");
    req.flush(mockRes);
  });

  // Caso de prueba 2
  it("Deberia hacer una peticion POST para iniciar sesion el ususario", () => {
    const mockRes = {
      "mensaje" : "Inicio de sesion exitoso",
      "token": tokenTest,
    }

    const datosUsuarios : Credenciales = datosUsers;
    service.inicioSesionUsuario(datosUsuarios).subscribe(
      (res) => {
        expect(res).toEqual(mockRes);
      }
    );

    const req = httMock.expectOne(urlLogin);
    expect(req.request.method).toBe("POST");
    req.flush(mockRes);
  });

  // Caso de prueba 3
  it("Deberia obtener el token", () => {
    localStorage.setItem("token", tokenTest);
    expect(service.obtenerToken()).toBe(tokenTest);
  });

  // Caso de prueba 4
  it("Deberia verificar si es admin", () => { 
    localStorage.setItem("token", tokenAdminTest);
    expect(service.esAdmin()).toBeTrue();
  });

  // Caso de prueba 5
  it("Deberia verificar si el usuario esta logueado", () => {
    localStorage.setItem("token", tokenTest);
    expect(service.estaLogueado()).toBeTrue();
  });

  // Caso de prueba 6
  it("Deberia cerrar sesión", () => {
    service.cierreSesion();
    expect(localStorage.getItem("token")).toBeNull();
  });

});
