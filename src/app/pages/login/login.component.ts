import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { IntegrationApiService } from 'src/app/services/integration-api.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
})
export class LoginComponent {

  dark: boolean;
  checked: boolean;

  loginData: any = { username: 'administrator', password: 'administrator123'};

  constructor(private messageService: MessageService,
              private integrationApiService: IntegrationApiService,
              private localStorageService: LocalStorageService,
              private authService: AuthService,
              private router: Router) {
    
  }

  login() {
    console.log(this.loginData)

    this.integrationApiService.login(this.loginData).subscribe( {
      next: (result) => {
        console.log(result.data.loginData);
        const userData = result.data.loginData;
        this.localStorageService.setItem("authToken", userData.token);
        this.authService.setAuthenticated(true);
        this.router.navigate(['/app-main'])
        //this.router.navigate(['/trackerApp/routes'])
      },
      error: (e) => {
        this.authService.setAuthenticated(false);
        console.log("Error en login:", e);
        this.showErrorMessage(e);
      }
    });

  }


  showErrorMessage(error: string) {
    //this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error });
}

}
