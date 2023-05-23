import { Component, Input, OnInit } from '@angular/core';
import { ConexionApiService } from '../conexion-api.service';
import { ConexionFirebaseService } from '../conexion-firebase.service';
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css'],
})
export class ProvinciaComponent {
  constructor(private servicioFirebase: ConexionFirebaseService) {}
  @Input() provincia: any;

  ngOnInit() {
    this.recogerFavoritos();
  }
  favoritos: any[] = [];
  anadirFavoritos(provincia: any) {
    this.servicioFirebase.subirInfoFavoritos(provincia);
    provincia.isFavorito = true;
    alert('se ha añdido correctamente' + provincia.fields.nombre);
  }

  recogerFavoritos() {
    this.servicioFirebase
      .cargarInfoFavoritos()
      .subscribe((provinciasFavoritas: any) => {
        this.favoritos = provinciasFavoritas.datos;
      });
  }
  isProvinciaInFavoritos(recordid: string): boolean {
    return this.favoritos.some((f: any) => f.recordid === recordid);
  }
}
