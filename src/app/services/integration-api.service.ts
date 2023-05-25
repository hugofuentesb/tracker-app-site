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






  // ===========================================================================
  //              LOCATIONS
  // ===========================================================================
  getLocation(id: number): Observable<any> {
    return this.http.get(`${this.URLBASE}/location/${id}`);
  }

  getLocations(filter: any): Observable<any> {
    return this.http.get(`${this.URLBASE}/location/`, { params: filter } );
  }

  /*
    Create a location
  */
  createLocation(request: any): Observable<any> {
    console.warn(request);
    return this.http.post(`${this.URLBASE}/location`, request);
  }

  // Edit a location
  editLocation(id: number, request: any): Observable<any> {
    return this.http.put(`${this.URLBASE}/location/${id}`, request);
  }

  // ===========================================================================
  //              LOCATION TYPES
  // ===========================================================================

  /*
  Getting location types
  */
  getLocationTypes(request: any): Observable<any> {
    return this.http.get(`${this.URLBASE}/locationTypes/`, request);
  }

  /*
    Create a location type
  */
  createLocationType(request: any): Observable<any> {
    console.warn(request);
    return this.http.post(`${this.URLBASE}/locationTypes`, request);
  }

  // ===========================================================================
  //              DAYS OF WEEK
  // ===========================================================================
  getDeaysOfWeek(request: any): Observable<any> {
    return this.http.get(`${this.URLBASE}/daysOfWeek`);
  }


  // ===========================================================================
  //              SCHEDULES
  // ===========================================================================
  getShedules(request: any): Observable<any> {
    return this.http.get(`${this.URLBASE}/schedule`);
  }

  // ===========================================================================
  //              BOOKINGS
  // ===========================================================================
  /*
  Getting bookings
  */
  getBookings(filter: any): Observable<any> {
    //console.log(" -> request:", filter);
    return this.http.get(`${this.URLBASE}/booking/`, { params: filter });
  }



  // ===========================================================================
  //              GAMES
  // ===========================================================================
  getListOfGames(request: any): Observable<any> {
    return this.http.get('https://www.freetogame.com/api/games');
  }

}
