import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {MessageService, Message, ConfirmationService} from 'primeng/api';


import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-info-vehicle',
    templateUrl: './info-vehicle.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../../assets/demo/badges.scss'],
    styles: []
})
export class InfoVehicleComponent implements OnInit {

    msgs: Message[] = [];

    vehicle$: any = {};
    @Input() idVehicle: number;
    @Input() readOnly: boolean = true;



    loading:boolean = true;


    constructor(private service: MessageService,
                private integrationApiService: IntegrationApiService) {
        
    }

    ngOnInit() {
        this.loadOptions();
    }

    loadOptions() {
        console.log("xxx", this.idVehicle);
        if(this.idVehicle > 0) {
            this.integrationApiService.getVehicle(this.idVehicle).subscribe( {
                next: (result) => {
                  this.vehicle$ = result.data.vehicle;
                },
                error: (e) => {
                  this.showErrorMessage(e);
                }
              });
        }
        
    }


    showErrorMessage(error: string) {
        //this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error });
    }

}