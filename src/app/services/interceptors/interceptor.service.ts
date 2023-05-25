import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de autenticación (puedes obtenerlo de un servicio de autenticación o de otra fuente)
    
    // Recuperar token desde local storage
    const authToken = this.localStorageService.getItem("authToken");
  
    // Clonar la solicitud y agregar el encabezado de autorización
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });
  
    // Pasar la solicitud clonada al siguiente manejador
    return next.handle(authRequest);
  }

}
