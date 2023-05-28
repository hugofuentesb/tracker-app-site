import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// GRAPHQL
import { Apollo } from 'apollo-angular';
import * as queries from '../graphql/graphql.queries';
import * as mutations from '../graphql/graphql.mutations';

@Injectable({
  providedIn: 'root'
})
export class IntegrationApiService {

  URLBASE = environment.URLBASE;
  constructor(private http: HttpClient,
              private apollo: Apollo) { }


  login(variables): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.LOGIN, variables: variables
      }).valueChanges;
  }



  // getAllDrivers() {
  //   this.apollo.watchQuery( {
  //     query: GET_ALL_DRIVERS
  //   }).valueChanges.subscribe( ({data, error}: any) => {
  //     console.log("GQL data", data);
  //   })
  // }

  getAllDrivers(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_DRIVERS
      }).valueChanges;
  }

  getDriver(id: number): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_DRIVER, variables: { id: id, activeRow: true }
      }).valueChanges;
  }

  getClient(id: number): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_CLIENT, variables: { id: id, activeRow: true }
      }).valueChanges;
  }

  getVehicle(id: number): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_VEHICLE, variables: { id: id, activeRow: true }
      }).valueChanges;
  }


  
  
  
  

  getAllVehicles(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_VEHICLES
      }).valueChanges;
  }

  getAllClients(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_CLIENTS
      }).valueChanges;
  }

  getAllDevices(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_DEVICES
      }).valueChanges;
  }

  getAllPackages(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_PACKAGES
      }).valueChanges;
  }

  getAllRoutes(): Observable<any>  {
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_ROUTES
      }).valueChanges;
  }

  getAllMainInfoRoutes(): Observable<any>  {
    return this.apollo.watchQuery( {
      query: queries.GET_ALL_INFO_ROUTES
    }).valueChanges;
  }

  

  getAllRouteDetails(id: number): Observable<any>  {
    console.log("recibo", id);
    return this.apollo.watchQuery( {
        query: queries.GET_ALL_ROUTE_DETAILS, variables: {idRoute: id, activeRow: true}
      }).valueChanges;
  }

  // ===========================================================================
  //              M U T A T I O N S
  // ===========================================================================
  addRoute(input: any): Observable<any> {
    return this.apollo.mutate( { mutation: mutations.ADD_ROUTE, variables: input } );
  }

  startRoute(input: any): Observable<any> {
    return this.apollo.mutate( { mutation: mutations.START_ROUTE, variables: input } );
  }

  cancelRoute(input: any): Observable<any> {
    return this.apollo.mutate( { mutation: mutations.CANCEL_ROUTE, variables: input } );
  }

  finishRoute(input: any): Observable<any> {
    return this.apollo.mutate( { mutation: mutations.FINISH_ROUTE, variables: input } );
  }

  restartAllForTest(input: any): Observable<any> {
    return this.apollo.mutate( { mutation: mutations.RESTART_ALL_FOR_TEST, variables: input } );
  }

  





}
