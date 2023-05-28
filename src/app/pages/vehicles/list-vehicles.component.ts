import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../breadcrumb.service';
import {MessageService, ConfirmationService} from 'primeng/api';


import { IntegrationApiService } from 'src/app/services/integration-api.service';

@Component({
    selector: 'app-list-vehicles',
    templateUrl: './list-vehicles.component.html',
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
export class ListVehiclesComponent implements OnInit {

    vehicle$: any = [];

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
        this.integrationApiService.getAllVehicles().subscribe( {
          next: (result) => {
            this.vehicle$ = result.data.vehicles;
            this.loading = false;
          },
          error: (e) => {
            console.log("Error reading Routes:", e.error.userMessage);
            //this.showError(e.error.userMessage);
            this.loading = false;
          }
        });
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