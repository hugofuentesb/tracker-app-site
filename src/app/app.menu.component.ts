import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
            
            {
                label: 'Routes', icon: 'pi pi-fw pi-star-fill', routerLink: ['/trackerApp'],
                items: [
                    {label: 'Routes', icon: 'pi pi-fw pi-directions',  routerLink: ['/trackerApp/routes']},
                    {label: 'Add new Route', icon: 'pi pi-fw pi-plus', routerLink: ['/trackerApp/addNewRoute']},
                ]
            },
            {label: 'Drivers', icon: 'pi pi-fw pi-user', routerLink: ['/drivers']},
            {label: 'Clients/Partners', icon: 'pi pi-fw pi-building', routerLink: ['/clients']},
            {label: 'Vehicles', icon: 'pi pi-fw pi-car', routerLink: ['/vehicles']},
            {label: 'Packages', icon: 'pi pi-fw pi-box', routerLink: ['/packages']},     
            {label: 'Devices', icon: 'pi pi-fw pi-mobile', routerLink: ['/devices']},

        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
