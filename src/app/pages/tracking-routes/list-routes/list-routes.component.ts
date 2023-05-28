import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {MessageService, Message, ConfirmationService, MenuItem} from 'primeng/api';


import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-list-routes',
    templateUrl: './list-routes.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../../assets/badges.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }

        .align-right {
            float: right;
        }
    `]
})
export class ListRoutesComponent implements OnInit {

    routes$: any = [];
    msgs: Message[] = [];

    showInfoOptions: boolean = true;
    showDialogInfoDriver: boolean = false;
    showDialogInfoClient: boolean = false;
    showDialogInfoVehicle: boolean = false;
    showDialogMapTracking: boolean = false;

    selectedRoute: any = null;
    selectedIdDriver: number = null;
    selectedIdClient: number = null;
    selectedIdVehicle: number = null;

    routeDetailsSelected: any[];






    statuses: any[];



    rowGroupMetadata: any;
    expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading:boolean = true;

    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;

    items: MenuItem[];

    constructor(private breadcrumbService: BreadcrumbService,
                private serviceMessage: MessageService,
                private integrationApiService: IntegrationApiService) {
        this.breadcrumbService.setItems([
            { label: 'UI Kit' },
            { label: 'Table', routerLink: ['/uikit/table'] }
        ]);

        this.items = [
            // {label: 'Start', icon: 'pi pi-play'},
            { label: 'Cancel', icon: 'pi pi-times', command: (event) => {
                                                        this.cancelRoute(this.selectedRoute.id);
                                                    }
            },
            { label: 'Finish', icon: 'pi pi-check-square', command: (event) => {
                                                                this.finishRoute(this.selectedRoute.id);
                                                            }
            },
        ];
    }

    ngOnInit() {
        this.loadOptions();
    }

    loadOptions() {
        this.routes$ = [];
        // this.integrationApiService.getAllRoutes().subscribe( {
        //   next: (result) => {
        //     this.routes$ = result.data.routes;
        //   },
        //   error: (e) => {
        //     // console.log("Error reading Routes:", e.error.userMessage);
        //     this.showErrorMessage(e);
        //   }
        // });

        this.integrationApiService.getAllMainInfoRoutes().subscribe( {
            next: (result) => {
              this.routes$ = result.data.routes;
              this.loading = false;
            },
            error: (e) => {
              //console.log("Error reading Routes:", e.error.userMessage);
              this.loading = false;
              this.showErrorMessage(e);
            }
          });
    }


    findRouteDetails(idRoute: number) {
        // this.showDialogMapTracking = true;
        this.integrationApiService.getAllRouteDetails(idRoute).subscribe( {
            next: (result) => {
                console.log(result.data.routeDetails);
                if(result.data.routeDetails && result.data.routeDetails.length > 0) {
                    this.routeDetailsSelected = result.data.routeDetails;
                    this.showDialogMapTracking = true;
                } else {
                    this.showErrorMessage("Route details was not found");
                }
            },
            error: (e) => {
                this.showErrorMessage(e);
            }
        });
    }

    startRoute(idRoute: number) {
        const variables = {
            input: { id: idRoute}
          };

        this.integrationApiService.startRoute(variables).subscribe( {
            next: (result) => {
                //console.log(result.data.data);
                this.showSuccessMessage('Start route:', 'Success');
                setTimeout(() => {
                    this.loadOptions();
                  }, 500);
                
            },
            error: (e) => {
                this.showErrorMessage(e);
            }
        });
    }
    
    cancelRoute(idRoute: number) {
        const variables = {
            input: { id: idRoute}
          };

        this.integrationApiService.cancelRoute(variables).subscribe( {
            next: (result) => {
                //console.log(result.data.routeDetails);
                this.showSuccessMessage('Cancel route:', 'Success');
                this.loadOptions();
            },
            error: (e) => {
                this.showErrorMessage(e);
            }
        })
    }

    finishRoute(idRoute: number) {
        const variables = {
            input: { id: idRoute}
          };

        this.integrationApiService.finishRoute(variables).subscribe( {
            next: (result) => {
                //console.log(result.data.routeDetails);
                this.showSuccessMessage('Finish route:', 'Success');
                this.loadOptions();
            },
            error: (e) => {
                this.showErrorMessage(e);
            }
        })
    }

    restartAllForTest(idRoute: number) {
        const variables = {};

        this.integrationApiService.restartAllForTest(variables).subscribe( {
            next: (result) => {
                console.log(result.data);
                this.showSuccessMessage('Routes restarted:', 'Success');
                this.loadOptions();
            },
            error: (e) => {
                this.showErrorMessage(e);
            }
        })
    }


    public selectRouteFromButton(item) {
        this.selectedRoute = item;
      }

    handleOptionClick(event: any) {
        
        // Realizar acciones basadas en la opción seleccionada
        console.log('Evento seleccionado:', event);
        //const selectedOption = event.item.command;
        //console.log('Opción seleccionada:', selectedOption);
      }

    showErrorMessage(message: string) {
        this.serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: message });
    }

    showSuccessMessage(title: string, message: string) {
        this.serviceMessage.add({ key: 'tst', severity: 'success', summary: title, detail: message });
    }




    showInfoDriver(idDriver: number) {
        this.selectedIdDriver = idDriver;
        this.showDialogInfoDriver = true;
    }

    showInfoClient(idClient: number) {
        this.selectedIdClient = idClient;
        console.log(this.selectedIdClient);
        this.showDialogInfoClient = true;
    }

    showInfoVehicle(idVehicle: number) {
        this.selectedIdVehicle = idVehicle;
        this.showDialogInfoVehicle = true;
    }


    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
    }

    expandAll() {
       
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}