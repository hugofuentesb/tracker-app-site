import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { io, Socket } from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;
  private readonly uri: string = environment.URLWEBSOCKET;

  constructor() { }

  connectToSocketServer() {
    this.socket = io(this.uri, {withCredentials: true});
  }

  isConnected(): boolean {
    return this.socket && this.socket.connected;
  }

  listen(eventName: string){
    return new Observable<any>((subscriber)=> {

      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });

    }).pipe(
      catchError((error) => {
        // Manejar el error adecuadamente
        console.error('Error en el WebSocket:', error);
        return []; // Otra opción podría ser lanzar un error personalizado
      })
    );
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnectFromServer() {
    this.socket.disconnect();
  }




  getConnectionStatus(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      if (this.socket) {
        subscriber.next(this.socket.connected);
      }
  
      this.socket.on('connect', () => {
        subscriber.next(true);
      });
  
      this.socket.on('disconnect', () => {
        subscriber.next(false);
      });
    });
  }


  onError(): Observable<any> {
    return new Observable<any>((subscriber) => {
      this.socket.on('error', (error: any) => {
        subscriber.error(error);
      });
    });
  }

  getSocketId(): string {
    return this.socket ? this.socket.id : '';
  }

  disconnectSocketId(socketId: string): void {
    if (this.socket && this.socket.id === socketId) {
      this.socket.disconnect();
    }
  }

}
