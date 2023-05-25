import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

import { environment } from 'src/environments/environment';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { MessageService } from 'primeng/api';

//import customIcon from "src/assets/icons/auto.png";

@Component({
  selector: 'app-map-tracking',
  templateUrl: './map-tracking.component.html',
  styleUrls: ['./map-tracking.component.scss']
})
export class MapTrackingComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() listOfWaypoints: any[];
  

  MAPBOX_KEY = environment.mapboxkey;

  mapa!: Mapboxgl.Map;
  directions: MapboxDirections;

  markerDriverPosition: any = null;

  constructor(private http: HttpClient,
              //private socket: Socket,
              private serviceMessage: MessageService,
              private webSocketService: WebSocketService) {
    
    
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.connectToSockets();
    this.subscriptions();
  }

  ngOnInit(): void {
    //this.initMap();
  }

  ngOnDestroy() {
    this.webSocketService.disconnectFromServer();
  }
  

  initMap() {
    (Mapboxgl as any).accessToken = this.MAPBOX_KEY;

    this.mapa = new Mapboxgl.Map({
        container: 'mapa-mapbox',                       // id de etiqueta div
        style: 'mapbox://styles/mapbox/streets-v12',    // Estilo de mapa (3D, etc)
        center: [-79.90840732512879,-2.1518157645948315],
        zoom: 15                                        // Zoom
      });
       
    this.mapa.addControl(new Mapboxgl.NavigationControl());

    const geocoder = new MapboxGeocoder({
      accessToken: this.MAPBOX_KEY,
      mapboxgl: Mapboxgl
    });
    //this.mapa.addControl(geocoder);

    //this.initTest();
    this.setMarkers();
    this.getRoute();
    this.mapa.setCenter([this.listOfWaypoints[0].lng, this.listOfWaypoints[0].lat]);
    this.mapa.fitBounds([ [this.listOfWaypoints[0].lng, this.listOfWaypoints[0].lat],
                          [this.listOfWaypoints[this.listOfWaypoints.length-1].lng, this.listOfWaypoints[this.listOfWaypoints.length-1].lat]   
                        ])

    // this.socket.emit('hello', 'Hola desde el cliente');

    // this.socket.on('serverEvent', (data) => {
    //   console.log('Mensaje del servidor:', data);
    // });
    
  }

  setMarkers() {
    console.log("setMarkers...", this.listOfWaypoints);
    this.listOfWaypoints.forEach((point:any) => {
      new Mapboxgl.Marker().setLngLat([point.lng, point.lat]).addTo(this.mapa);
    });
  }

  getRoute() {
    let stringPoints = "";
    this.listOfWaypoints.forEach((point:any) => {
      const s = point.lng+','+point.lat+';'
      stringPoints = stringPoints + s;
    });
    stringPoints = stringPoints.substring(0, stringPoints.length-1);

    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + stringPoints + '?steps=true&geometries=geojson&access_token=' + this.MAPBOX_KEY;
    this.http.get(url).subscribe( (res:any) => {

      const data = res.routes[0];
      const route = data.geometry.coordinates;

      this.mapa.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': route
            }
          }
      });
      this.mapa.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
      });
    });

  }

  setMarkerToNewPosition(lnglat: any) {
    console.log("setMarkerToNewPosition...", lnglat);
    if(this.markerDriverPosition == null) {
      this.markerDriverPosition = new Mapboxgl.Marker(
        { color: 'purple'}
      //   { 
      //   element: this.createCustomIcon(),
      // }
      ).setLngLat(lnglat).addTo(this.mapa);
    }
    else {
      this.markerDriverPosition.setLngLat(lnglat);
    }
  }

  createCustomIcon(): HTMLElement {
    const iconElement = document.createElement('div');
    iconElement.classList.add('marker-truck');
    //iconElement.className='marker-truck';
    return iconElement;
  }

  addMarkerCustom(lnglat: any) {
    console.log("addMarkerCustom...");
    const el = document.createElement('div');
    //el.className = 'marker-truck';

    el.className = 'marker-truck';
    //el.style.backgroundImage = `url(../../../assets/icons/camion-de-reparto.png);`;
    el.style.backgroundImage = '../../../assets/icons/camion-de-reparto.png';
    //el.style.backgroundImage = `url(../../../assets/icons/camion-de-reparto.png/${50}/${50}/)`;
    //el.style.backgroundImage = `url(https://placekitten.com/g/${50}/${50}/)`;
    el.style.backgroundColor = 'red';
    el.style.width = `${50}px`;
    el.style.height = `${50}px`;
    el.style.backgroundSize = '100%';

    this.markerDriverPosition = new Mapboxgl.Marker(el);
    this.markerDriverPosition.setLngLat(lnglat).addTo(this.mapa)
  }


   /*
    S O C K E T S    I O
  */
    connectToSockets() {
      this.webSocketService.connectToSocketServer();
    }

    sendMessageToAll() {
      //console.log(this.jumper);
      this.webSocketService.emit('message.all', {msj:"Mensaje a todos"});
    }

    subscriptions() {
      this.webSocketService.listen('connected').subscribe( (eventData: any)=>{
        this.onEventConnected(eventData);
      });

      this.webSocketService.listen('coordinates.getRamdon').subscribe( (eventData: any)=>{
        this.setMarkerToNewPosition(eventData.lnglat);
        //this.addMarkerCustom(eventData.lnglat);
      })

      this.webSocketService.listen('simulation.finish').subscribe( (eventData: any)=>{
        this.showSuccessMessage('Simulation', eventData.msj);
        //this.addMarkerCustom(eventData.lnglat);
      })
    }

    onEventConnected(eventData: any): void {
      // Lógica para manejar el evento recibido
      console.log('Evento recibido:', eventData);
      //console.log("Voy a enviar...", this.listOfWaypoints);
      this.webSocketService.emit('simulation.start', { start: [this.listOfWaypoints[0].lng, this.listOfWaypoints[0].lat],
                                               end:   [this.listOfWaypoints[this.listOfWaypoints.length-1].lng, this.listOfWaypoints[this.listOfWaypoints.length-1].lat]
                                              });
    }

    onEventReceived(eventData: any): void {
      // Lógica para manejar el evento recibido
      console.log('Evento recibido:', eventData);
      //this.events.push(eventData);
    }

    emitEventToServer(): void {
      const eventData = { message: 'Hola servidor WebSocket' };
      this.webSocketService.emit('nombreEvento', eventData);
    }


    showErrorMessage(message: string) {
      this.serviceMessage.add({ key: 'tst-map-tracking', severity: 'error', summary: 'Error Message', detail: message });
    }
  
    showSuccessMessage(title: string, message: string) {
        this.serviceMessage.add({ key: 'tst-map-tracking', severity: 'success', summary: title, detail: message });
        //setTimeout(() => this.router.navigate(['/trackerApp/routes']), 2000);
    }
  

}
