import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {IconsComponent} from './utilities/icons.component';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { AddNewRouteComponent } from './pages/tracking-routes/add-new-route/add-new-route.component';
import { ListPackagesComponent } from './pages/packaging/list-packages/list-packages.component';
import { ListClientsComponent } from './pages/clients-partners/list-clients.component';
import { ListRoutesComponent } from './pages/tracking-routes/list-routes/list-routes.component';
import { ListDriversComponent } from './pages/drivers/list-drivers.component';
import { ListVehiclesComponent } from './pages/vehicles/list-vehicles.component';
import { ListDevicesComponent } from './pages/devices/list-devices.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MapboxComponent } from './pages/mapbox/mapbox.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [

                    // HFU
                    
                    // {path: '', component: LoginComponent},
                    // {path: 'trackerApp/mapbox', component: MapboxComponent},
                    // {path: 'trackerApp/addNewRoute', component: AddNewRouteComponent},
                    // {path: 'trackerApp/packages', component: ListPackagesComponent},
                    // {path: 'trackerApp/routes', component: ListRoutesComponent, canActivate: [AuthGuard] },

                    // {path: 'trackerApp/clients', component: ListClientsComponent},
                    // {path: 'trackerApp/drivers', component: ListDriversComponent},
                    // {path: 'trackerApp/vehicles', component: ListVehiclesComponent},
                    // {path: 'trackerApp/devices', component: ListDevicesComponent},

                    {path: '', component: LoginComponent},
                    {path: 'trackerApp/routes', component: ListRoutesComponent, canActivate: [AuthGuard] },
                    {path: 'trackerApp/addNewRoute', component: AddNewRouteComponent},

                    {path: 'packages', component: ListPackagesComponent},
                    

                    {path: 'clients', component: ListClientsComponent},
                    {path: 'drivers', component: ListDriversComponent},
                    {path: 'vehicles', component: ListVehiclesComponent},
                    {path: 'devices', component: ListDevicesComponent},

                    
                    // HFU

                    

                    //{path: 'dashboard', component: DashboardDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            // {path: 'login', component: AppLoginComponent},
            {path: 'login', component: LoginComponent},
            {path: 'app-main', component: AppMainComponent, canActivate: [AuthGuard]},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
