import {Component, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../../breadcrumb.service';

import { Message, MessageService } from 'primeng/api';

import { DtoRoute } from 'src/app/dtos/dtos';
import { IntegrationApiService } from 'src/app/services/integration-api.service';
import { MapaComponent } from '../../mapa/app-mapa.component';
import { ListPackagesComponent } from '../../packaging/list-packages/list-packages.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-new-route',
    templateUrl: './add-new-route.component.html',
    providers: [MessageService]
})
export class AddNewRouteComponent {

  drivers$: any = [];
  clients$: any = [];
  devices$: any = [];
  vehicles$: any = [];
  msgs: Message[] = [];

  route: DtoRoute ;

  waypoints: any[] = [];
  lastWayPointPackageClicked: number;

  @ViewChild(MapaComponent) mapaComponente: MapaComponent;
  @ViewChild(ListPackagesComponent) listPackagesComponent: ListPackagesComponent;

  showPackagesDialog: boolean = false;

  
  
  constructor(private breadcrumbService: BreadcrumbService,
              private serviceMessage: MessageService,
              private router: Router,
              private integrationApiService: IntegrationApiService) {
      this.breadcrumbService.setItems([
          { label: 'UI Kit' },
          { label: 'Form Layout', routerLink: ['/uikit/formlayout'] }
      ]);

      this.route = new DtoRoute();
  }

  ngOnInit(): void {
      this.loadOptions();
  }

  loadOptions() {
      // this.integrationApiService.getAllDrivers().subscribe(
      //               ({data, error}: any) => {
      //               this.drivers$ = data.drivers;
      //               } );
  
      this.integrationApiService.getAllDrivers().subscribe( {
        next: (result) => {
          this.drivers$ = result.data.drivers;
        },
        error: (e) => {
          console.log("Error loading Drivers:", e.error.userMessage);
          //this.showError(e.error.userMessage);
        }
      });
  
      // Clients
      this.integrationApiService.getAllClients().subscribe( {
        next: (result) => {
          this.clients$ = result.data.clients;
        },
        error: (e) => {
          console.log("Error loading Clients:", e.error.userMessage);
          //this.showError(e.error.userMessage);
        }
      });
  
      // Devices
      this.integrationApiService.getAllDevices().subscribe( {
        next: (result) => {
          this.devices$ = result.data.devices;
        },
        error: (e) => {
          console.log("Error loading Devices:", e.error.userMessage);
          //this.showError(e.error.userMessage);
        }
      });

      // Vehicles
      this.integrationApiService.getAllVehicles().subscribe( {
        next: (result) => {
          this.vehicles$ = result.data.vehicles;
        },
        error: (e) => {
          console.log("Error loading Vechicles:", e.error.userMessage);
          //this.showError(e.error.userMessage);
        }
      });
      
  
  }

  addWayPoint(lngLat: any) {
    console.log("lnglat:", lngLat);
    //this.waypoints.push(lngLat);
    this.waypoints.push( {lng: lngLat[0], lat: lngLat[1]} )
    this.waypoints[this.waypoints.length-1].secuence = this.waypoints.length;
    //this.mapaComponente.createNewMarker(lngLat);
  }

  removeWayPoint(index: any) {
    this.waypoints.splice(index, 1);
    this.reOrderSecuences();
    this.mapaComponente.deleteWayPointByIndex(index);
  }

  reOrderSecuences() {
    let index = 0;
    for(let item of this.waypoints){
      this.waypoints[index].secuence = index;
      index++;
    }
  }

  clickButtonPackageDialog(index) {
    this.showPackagesDialog = true;
    this.lastWayPointPackageClicked = index;

    console.log("index waypoint:", index);
  }

  addPackageToWayPoint() {
    //console.log("LASTclicked:", this.lastWayPointPackageClicked);
    this.showPackagesDialog = false;
      if(this.lastWayPointPackageClicked >= 0) {
        let _package = this.listPackagesComponent.selectedPackage;
        this.waypoints[this.lastWayPointPackageClicked].idTrackingPackage = _package.id;
        console.log("Package:", _package);
        console.log("Waypoint[]", this.waypoints[this.lastWayPointPackageClicked]);
      }
  }


  saveRoute() {
    this.route.routeDetails = this.waypoints;
    console.log("ROUTE:", this.route);

  // const variables = {
  //   input: {
  //     idDriver: 2,
  //     idVehicle: 1,
  //     idClient: 1,
  //     idDevice: 1,
  //     estimatedStartDate: "2023-05-10T19:23:00.761000Z",
  //     estimatedEndDate: "2023-05-10T19:23:00.761000Z",
  //     routeDetails: [
  //         {
  //             idTrackingPackage: 1,
  //             secuence: 1,
  //             lng: -79.90765,
  //             lat: -2.14885
  //         },
  //         {
  //             idTrackingPackage: 2,
  //             secuence: 2,
  //             lng: -79.90462,
  //             lat: -2.14945
  //         }
  //     ]
  //   }
  // };

  const variables = {
    input: this.route
  }


    this.integrationApiService.addRoute(variables).subscribe( {
      next: (result) => {
        //this.vehicles$ = result.data.vehicles;
        console.log("DATA:", result.data);
        this.showSuccessMessage("Create Route", "Success!");
      },
      error: (e) => {
        //console.log("Error saving Route:", e.error);
        this.showErrorMessage(e);
      }
    });


  }

  showErrorMessage(message: string) {
    this.serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: message });
  }

  showSuccessMessage(title: string, message: string) {
      this.serviceMessage.add({ key: 'tst', severity: 'success', summary: title, detail: message });
      setTimeout(() => this.router.navigate(['/trackerApp/routes']), 2000);
  }
}
