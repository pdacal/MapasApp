import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapServiceService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {




  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(
    private placesService: PlacesService,
    private mapService: MapServiceService
    ) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay placesService.userLocation');
    const map = new Map({
      //enviamoslle o div onde vai renderizar o mapa
      container: this.mapDivElement.nativeElement,
      //distintos tipos de estilos de mapas
      // mapbox://styles/mapbox/navigation-night-v1
      // mapbox://styles/mapbox/satellite-streets-v12
      // mapbox://styles/mapbox/navigation-day-v1
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    const popup = new Popup().setHTML(`<h6>Aquí estoy</h6><span>Estoy en este lugar del mundo</span>`);
    new Marker({ color: 'black' }).setLngLat(this.placesService.userLocation)
      .setPopup(popup).addTo(map);

      this.mapService.setMap(map);
  }

}
