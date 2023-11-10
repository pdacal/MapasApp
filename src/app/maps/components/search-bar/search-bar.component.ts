import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapServiceService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer? : NodeJS.Timeout;

  constructor(private placesService: PlacesService,
              private mapService: MapServiceService
    ){}

  onQueryChanged(query: string = ''){

    // para que colla o que escribimos cando estemos Xs sen escribir
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.mapService.deletePolyline(); //borra a linea anterior
    this.mapService.deleteMarkers();//borra os markers anteriores
    // console.log('Mandar este query:', query)
    // unir cun backend para que devolva os lugares que coinciden ca busqueda
    this.debounceTimer = setTimeout( () => {
      this.placesService.getPlacesByQuery( query );
    }, 500);
  }

}
