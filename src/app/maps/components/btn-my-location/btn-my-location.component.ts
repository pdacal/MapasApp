import { Component } from '@angular/core';
import { MapServiceService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {


  constructor(
    private mapService: MapServiceService,
    private placesService: PlacesService
  ){}

  goToMyLocation(){
    if(!this.placesService.isUserLocationReady) throw Error('No hay  Ubicación de usuario');
    if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');
    this.mapService.flyTo(this.placesService.userLocation!);
  }

}
