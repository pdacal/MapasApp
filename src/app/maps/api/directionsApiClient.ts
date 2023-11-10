import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";

// sustituto do http client
@Injectable({
  providedIn:'root'
})
export class DirectionsApiClient extends HttpClient{
  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  // esto permitiranos usar as peticions http como usualmente as fariamos con get/put/push/etc
  constructor(handler: HttpHandler){
    super(handler);
  }

  // para usalo coma sustituo de http e poder chamar a get, debemos facer nos o propio metodo
  // como non sabemos a lcoalizacion, e debe ter  a mesma firma ca o get de http orixinal,
  // collemos as options e params do orixinal, e chamamolos pa usalo no ...options.params
  public override get<T>(url:string, options:{
    params?: HttpParams | {
      [param: string]:string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }){

    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language:'es',
        overview: 'simplified',
        steps: false,
        access_token: environment.apiKey
      }
    });
  }
}
