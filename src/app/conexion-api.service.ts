import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  constructor(private http: HttpClient) { }

  totalFilas:number = 41 
  urlApi:string = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=centros-de-inspeccion-tecnica-de-vehiculos-en-castilla-y-leon%40jcyl&q=&rows=${this.totalFilas}&facet=provincia`;

  getCentrosDeInspeccion(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }
  
}
