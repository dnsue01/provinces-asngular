import { Component } from '@angular/core';
import { ConexionApiService } from '../conexion-api.service';
import { ConexionFirebaseService } from '../conexion-firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(private servicioApi: ConexionApiService, private servicioFirebase: ConexionFirebaseService) { }


  ngOnInit() {
    this.obtenerDatos()
    this.recogerFavoritos()
  }

  provincias: any = [];

  totalResultados: number = 0;
  totalResultadosApi: number = 0;
  zonasConcesionalesApi: any = []
  zonasConcesionales: any = []
  infoProvinciasApi: any = [];
  infoProvincias: any = [];
  palabraBuscada: any = '';
  favoritos:any[] =[]

  obtenerDatos(): void {
    this.servicioApi.getCentrosDeInspeccion().subscribe(
      data => {

        // Manejo los datos recibidos de la API aquí
        this.totalResultadosApi = data.parameters.rows
        this.totalResultados = this.totalResultadosApi
        //las provicias totales
        this.provincias = data.facet_groups[0].facets
        //informacion reelevante provincias
        this.infoProvinciasApi = data.records
        this.infoProvincias = this.infoProvinciasApi;
        //recorro las provincias para saber la zona concesional
        for (let index = 0; index < this.infoProvinciasApi.length; index++) {
          const infoProvincia = this.infoProvinciasApi[index].fields;
          if (!this.zonasConcesionalesApi.includes(infoProvincia.zona_concesional)) {
            this.zonasConcesionalesApi.push(infoProvincia.zona_concesional)
          }

        }
        this.zonasConcesionales = this.zonasConcesionalesApi
      },
      error => {
        // Maneja los errores aquí
        console.error(error);
      }
    );
  }


  seleccionarPruebaDetalle(e: any) {

    let infoProvinciasFiltro = [];
    this.buscarProvincia();
    if (e.target.value !== '') {

      for (let index = 0; index < this.infoProvincias.length; index++) {
        const infoProvincia = this.infoProvincias[index];

        if (infoProvincia.fields.zona_concesional == e.target.value) {
          infoProvinciasFiltro.push(infoProvincia);
        }
      }

      this.infoProvincias = infoProvinciasFiltro
      this.totalResultados = infoProvinciasFiltro.length
    } else {
      this.buscarProvincia();
    }
  }

  anadirFavoritos(provincia: any) {
    this.servicioFirebase.subirInfoFavoritos(provincia);
    provincia.isFavorito = true;
    alert("se ha añdido correctamente"+provincia.fields.nombre)
  }
  

  
  recogerFavoritos() {
    this.servicioFirebase.cargarInfoFavoritos().subscribe((provinciasFavoritas: any) => {
      this.favoritos = provinciasFavoritas.datos;
    });
  }
  isProvinciaInFavoritos(recordid: string): boolean {
    return this.favoritos.some((f: any) => f.recordid === recordid);
  }
  
  
  
  

  buscarProvincia() {
    this.infoProvincias = [];
    this.zonasConcesionales = []
    if (this.palabraBuscada !== '') {
      const palabraMinusculas = this.palabraBuscada.toLowerCase(); // Convert the search palabraMinusculas to lowercase
      for (let index = 0; index < this.infoProvinciasApi.length; index++) {
        let infoProvincia = this.infoProvinciasApi[index];


        const provinciaMinusculas = infoProvincia.fields.provincia.toLowerCase(); // Convert the province name to lowercase
        if (provinciaMinusculas.includes(palabraMinusculas)) {
          this.infoProvincias.push(infoProvincia);
        }
      }
      for (let index = 0; index < this.infoProvincias.length; index++) {
        const infoProvincia = this.infoProvincias[index].fields;
        if (!this.zonasConcesionales.includes(infoProvincia.zona_concesional)) {
          this.zonasConcesionales.push(infoProvincia.zona_concesional)
        }

      }


      this.totalResultados = this.infoProvincias.length

    } else {
      this.infoProvincias = this.infoProvinciasApi;
      this.zonasConcesionales = this.zonasConcesionalesApi;
      this.totalResultados = this.totalResultadosApi



    }
  }

}
