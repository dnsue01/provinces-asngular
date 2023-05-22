import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConexionFirebaseService {

  constructor(private http: HttpClient) { }

  subirInfoFavoritos(infoProvincia: any): void {
    this.cargarInfoFavoritos().subscribe((data: any) => {
      let datos = data && data.datos ? data.datos : [];
      datos.push(infoProvincia);

      this.http.put("https://privinciascyl-default-rtdb.europe-west1.firebasedatabase.app/datos.json", { datos }).subscribe(
        response => console.log("se ha agregado", response),
        error => console.log("error", error)
      );
    });
  }
  borrarElementoPorId(id: string): void {
    const url = 'https://privinciascyl-default-rtdb.europe-west1.firebasedatabase.app/datos.json';
  
    this.http.get(url).subscribe((data: any) => {
      let datos = data && data.datos ? data.datos : [];
  
      // Buscar el elemento que coincida con el ID
      const elemento = datos.find((item: any) => item.recordid === id);
      if (elemento) {
        // Obtener el índice del elemento
        const index = datos.indexOf(elemento);
  
        // Eliminar el elemento del array
        datos.splice(index, 1);
  
        // Actualizar los datos en la base de datos
        this.http.put(url, { datos }).subscribe(
          response => console.log("Se ha eliminado el elemento", response),
          error => console.log("Error al eliminar el elemento", error)
        );
      } else {
        console.log("No se encontró ningún elemento con el ID", id);
      }
    });
  }
  
  
  
  
  
  
  
  cargarInfoFavoritos(): Observable<any> {
    return this.http.get("https://privinciascyl-default-rtdb.europe-west1.firebasedatabase.app/datos.json");
  }

}
