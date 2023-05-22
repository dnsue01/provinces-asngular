import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//conexiones 
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';


//inputs 
import { FormsModule } from '@angular/forms';
import { FavoritosComponent } from './favoritos/favoritos.component';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
