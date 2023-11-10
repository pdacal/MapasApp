import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer? : NodeJS.Timeout;

  constructor(private placesService: PlacesService){}

  onQueryChanged(query: string = ''){
    // para que colla o que escribimos cando estemos Xs sen escribir
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout( () => {
      // console.log('Mandar este query:', query)
      // unir cun backend para que devolva os lugares que coinciden ca busqueda
      this.placesService.getPlacesByQuery( query );
    }, 500);
  }

}
