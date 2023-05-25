import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './app-mapa.component.html',
  styleUrls: ['./app-mapa.component.scss']
})
export class MapaComponent {

  MAPBOX_KEY = environment.mapboxkey;
  @Output() currentPositionEvent = new EventEmitter<any>();
  @Output() deleteWayPointEvent = new EventEmitter<any>();
  

  mapa!: Mapboxgl.Map;
  title = 'mapbox-app';

  origin = [-79.908157,-2.1524653];
  destination = [-79.9052495,-2.153768];
  currentPosition: any;
  

  showMenu = false;
  contextMenuPositionX = 0;
  contextMenuPositionY = 0;
  currentContextMenuPosition: any;

  showMarkerMenu = false;
  markerMenuPositionX = 0;
  markerMenuPositionY = 0;

  listOfMarkers: any[] = [];
  lastClickedMarkerLngLat:any = {};

  
  
  ngOnInit(): void {
    this.initMap();
    this.initMapEvents();
  }

  ngAfterViewInit() {
    //setTimeout(() => this.crearMarcador(-79.908157,-2.1524653), 5000);
  }

  initMap() {
    //Mapboxgl.accessToken = environment.mapboxkey;
    (Mapboxgl as any).accessToken = this.MAPBOX_KEY;

    this.mapa = new Mapboxgl.Map({
        container: 'mapa-mapbox',                       // id de etiqueta div
        style: 'mapbox://styles/mapbox/streets-v12',    // Estilo de mapa (3D, etc)
        //center: [-79.9080253, -2.1508171],              // Longitud, latitud (o era al revés ?)
        center: [-79.90840732512879,-2.1518157645948315],
        //trackResize: true,
        zoom: 15                                        // Zoom
      });
       
    this.mapa.addControl(new Mapboxgl.NavigationControl());

    const geocoder = new MapboxGeocoder({
      accessToken: this.MAPBOX_KEY,
      mapboxgl: Mapboxgl
    });

    this.mapa.addControl(geocoder);

    
    
    // //this.pintarCoordenadas();
    //setTimeout(()=>{this.getRoute()}, 3000);    

  }

  initMapEvents() {

    // Righ Click
    this.mapa.on('contextmenu', (e) => {
      console.log("initMapa-contextMenu");

      const lngLat = [e.lngLat.lng, e.lngLat.lat];
      this.currentContextMenuPosition = lngLat;
      
      //this.addMarker(lngLat);
    });

    // this.mapa.on('click', 'markers', () => {
    //   //this.mapa.getCanvas().style.cursor = '';
    //   this.showMarkerMenu = true;
    //   console.log("Click marker...");
    // });
  }



  // crearMarcador(lng: number, ltd: number) {
  //   let marker = new Mapboxgl.Marker({
  //     draggable: true,
  //     anchor:'center',
  //     //color:'yellow',
  //   }).setLngLat(  [lng, ltd]).addTo(this.mapa);

  //   marker.on('drag', ()=> {
  //     console.log("Posición:", marker.getLngLat());
  //     this.currentPosition = marker.getLngLat();
  //   });

  //   marker.getElement().addEventListener('click', () => {
  //     //console.log("Posición:", marker.getLngLat());
  //     this.currentPosition = marker.getLngLat();
  //   });
  //   this.mapa.resize();
  // }



  createNewMarker = (lngLat: any) => {
    console.log("CreatenewMarker", lngLat);
    const marker = new Mapboxgl.Marker({
      draggable: false,
      color: "green",
    }).setLngLat(lngLat).addTo(this.mapa);

    marker.getElement().addEventListener('click', (event) => {
      console.log("Click marker...");
      this.showMarkerMenu = true;
      console.log("Posición:", marker.getLngLat());
      this.markerMenuPositionX = event.clientX;
      this.markerMenuPositionY = event.clientY;
      this.lastClickedMarkerLngLat = marker.getLngLat();
    });

    this.listOfMarkers.push(marker);
    
  }

  refreshMap() {
    this.mapa.resize();
  }

 

  getCurrentPosition() {
    return this.currentPosition;
  }

  emitCurrentPosition() {
    //this.currentPositionEvent.emit(this.currentPosition);
    this.currentPositionEvent.emit(this.currentContextMenuPosition);
  }

  emitDeleteWayPoint(indexDeletedWayPoint: number) {
    this.deleteWayPointEvent.emit(indexDeletedWayPoint);
  }

  deleteWayPointByIndex(index: number) {
    this.listOfMarkers[index].remove();
    this.listOfMarkers.splice(index, 1);
  }


  showContextMenu(event: MouseEvent) {
    console.log(event);
    event.preventDefault();
    this.showMenu = true;
    this.contextMenuPositionX = event.clientX;
    this.contextMenuPositionY = event.clientY;
  }

  menuItemClicked(option: number) {
    // Realiza acciones basadas en la opción seleccionada
    // Por ejemplo, muestra información relacionada con la opción o realiza una acción específica
    if(option == 1) {
      console.log('Opción seleccionada:', option);
      this.createNewMarker(this.currentContextMenuPosition);
      this.emitCurrentPosition();
    }
    
    // Oculta el menú contextual
    this.hideContextMenu();
  }

  hideContextMenu() {
    this.showMenu = false;
  }


  menuMarkerItemClicked(option: number) {
    // Option 1: Delete Marker
    if(option == 1) {
      console.log('Menu Marker Opción seleccionada:', option);

      const indexOnList = this.findMarkerIndexBasedOnLnglat(this.listOfMarkers, this.lastClickedMarkerLngLat);

      this.listOfMarkers[indexOnList].remove();
      this.listOfMarkers.splice(indexOnList, 1);

      //console.log("Size listOfMarkers:", this.listOfMarkers.length);
      this.emitDeleteWayPoint(indexOnList);
    }
    
    // Oculta el menú contextual
    this.hideMarkerMenu();
  }

  hideMarkerMenu() {
    this.showMarkerMenu = false;
  }
  

  findMarkerIndexBasedOnLnglat(list: any[], lnglat: any) {
    const index = list.findIndex( (item) => item.getLngLat().lng == lnglat.lng && item.getLngLat().lat == lnglat.lat );
    return index;
  }

}
