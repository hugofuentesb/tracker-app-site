import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private localStorageService: LocalStorageService) { }

  isAuthenticated$(): Observable<boolean> {
    const authToken = this.localStorageService.getItem("authToken");
    // console.log("authToken:", authToken);
    if( authToken != null) {
      this.setAuthenticated(true);
    } else {
      this.setAuthenticated(false);
    }
    return this.isLoggedIn;
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isLoggedIn.next(isAuthenticated);
    if(!isAuthenticated) {
      this.localStorageService.removeItem("authToken");
    }
  }
}
