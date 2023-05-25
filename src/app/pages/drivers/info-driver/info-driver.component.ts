import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Customer, Representative} from '../../../demo/domain/customer';
import {CustomerService} from '../../../service/customerservice';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../service/productservice';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {MessageService, Message, ConfirmationService} from 'primeng/api';


import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-info-driver',
    templateUrl: './info-driver.component.html',
    providers: [MessageService, ConfirmationService, CustomerService, ProductService],
    styleUrls: ['../../../../assets/demo/badges.scss'],
    styles: []
})
export class InfoDriverComponent implements OnInit {

    msgs: Message[] = [];

    driver$: any = {};
    @Input() idDriver: number;
    @Input() readOnly: boolean = true;



    loading:boolean = true;


    constructor(private messageService: MessageService,
                private integrationApiService: IntegrationApiService) {
        
    }

    ngOnInit() {
        this.loadOptions();
    }

    loadOptions() {
        if(this.idDriver > 0) {
            this.integrationApiService.getDriver(this.idDriver).subscribe( {
                next: (result) => {
                  this.driver$ = result.data.driver;
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
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error });
    }

}