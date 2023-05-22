import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { FavoritosComponent } from './favoritos/favoritos.component';


const routes: Routes = [
{ path: '', component: PrincipalComponent, pathMatch: 'full' },
{ path: 'favoritos', component: FavoritosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

