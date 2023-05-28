import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {MessageService, Message, ConfirmationService} from 'primeng/api';

import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-info-client',
    templateUrl: './info-client.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../../assets/demo/badges.scss'],
    styles: []
})
export class InfoClientComponent implements OnInit {

    msgs: Message[] = [];

    client$: any = {};
    @Input() idClient: number;
    @Input() readOnly: boolean = true;



    loading:boolean = true;


    constructor(private service: MessageService,
                private integrationApiService: IntegrationApiService) {
        
    }

    ngOnInit() {
        this.loadOptions();
    }

    loadOptions() {
        console.log("xxx", this.idClient);
        if(this.idClient > 0) {
            this.integrationApiService.getClient(this.idClient).subscribe( {
                next: (result) => {
                  this.client$ = result.data.client;
                },
                error: (e) => {
                  //console.log("Error reading Drivers:", e.error.userMessage);
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