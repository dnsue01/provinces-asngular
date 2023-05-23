import { Component } from '@angular/core';
import { ConexionFirebaseService } from '../conexion-firebase.service';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent {
  constructor(private servicioFirebase: ConexionFirebaseService) {}

  ngOnInit() {
    this.recogerFavoritos();
  }

  provincias: any = [];

  totalResultados: number = 0;
  favoritos: any[] = [];

  elimnarFavoritos(provincia: any) {
    const index = this.favoritos.findIndex(
      (f: any) => f.recordid === provincia.recordid
    );
    if (index !== -1) {
      this.favoritos.splice(index, 1);
      this.totalResultados = this.favoritos.length;
    }
    this.servicioFirebase.borrarElementoPorId(provincia.recordid);
  }

  recogerFavoritos() {
    this.servicioFirebase
      .cargarInfoFavoritos()
      .subscribe((provinciasFavoritas: any) => {
        this.favoritos = provinciasFavoritas.datos;
        this.totalResultados = this.favoritos.length;
      });
  }
  isProvinciaInFavoritos(recordid: string): boolean {
    return this.favoritos.some((f: any) => f.recordid === recordid);
  }
}
