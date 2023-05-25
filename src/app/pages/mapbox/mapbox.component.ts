import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {

  mapa!: Mapboxgl.Map;
  MAPBOX_KEY = environment.mapboxkey;

  showMenu = false;
  contextMenuPositionX = 0;
  contextMenuPositionY = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
    
  }

  initMap() {
    (Mapboxgl as any).accessToken = this.MAPBOX_KEY;

    this.mapa = new Mapboxgl.Map({
        container: 'map',                       // id de etiqueta div
        style: 'mapbox://styles/mapbox/streets-v12',    // Estilo de mapa (3D, etc)
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

    this.mapa.on('contextmenu', (e) => {
      const lngLat = [e.lngLat.lng, e.lngLat.lat];
      
      console.log("initMapa-contextMenu");
      console.log(lngLat);
      // Aquí puedes hacer lo que desees con las coordenadas del clic derecho
      // Por ejemplo, puedes agregar un marcador en esa ubicación
      //this.addMarker(lngLat);
    });
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
    console.log('Opción seleccionada:', option);
    
    // Oculta el menú contextual
    this.hideContextMenu();
  }

  hideContextMenu() {
    this.showMenu = false;
  }

}
