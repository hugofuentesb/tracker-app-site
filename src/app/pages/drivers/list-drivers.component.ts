import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../breadcrumb.service';
import {MessageService, Message, ConfirmationService} from 'primeng/api';


import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-list-drivers',
    templateUrl: './list-drivers.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
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
    `]
})
export class ListDriversComponent implements OnInit {

    drivers$: any = [];
    msgs: Message[] = [];


    statuses: any[];


    rowGroupMetadata: any;
    expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading:boolean = true;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(private breadcrumbService: BreadcrumbService,
                private service: MessageService,
                private integrationApiService: IntegrationApiService) {
        this.breadcrumbService.setItems([
            { label: 'UI Kit' },
            { label: 'Table', routerLink: ['/uikit/table'] }
        ]);
    }

    ngOnInit() {
        this.loadOptions();

        this.onInitFromDemo();
        
    }

    loadOptions() {
        this.integrationApiService.getAllDrivers().subscribe( {
          next: (result) => {
            this.drivers$ = result.data.drivers;
            this.loading = false;
          },
          error: (e) => {
            console.log("Error reading Drivers:", e);
            //this.showError(e.error.userMessage);
            this.showErrorMessage(e);
            this.loading = false;
          }
        });
    }


    showErrorMessage(error: string) {
        //this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error });
    }






    onInitFromDemo() {
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