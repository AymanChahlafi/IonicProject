import { NgModule, ViewChild, ViewChildren } from '@angular/core';
import { ChildrenOutletContexts, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'city-details/:id',
    loadChildren: () => import('./city-details/city-details.module').then( m => m.CityDetailsPageModule)
  },
  {
    path: 'add-city',
    loadChildren: () => import('./add-city/add-city.module').then( m => m.AddCityPageModule)
  },
  {
    path: 'update-city',
    loadChildren: () => import('./update-city/update-city.module').then( m => m.UpdateCityPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./trip/trip.module').then( m => m.TripPageModule)
  },
  {
    path: 'list-reservation',
    loadChildren: () => import('./list-reservation/list-reservation.module').then( m => m.ListReservationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'ajouter-pays',
    loadChildren: () => import('./ajouter-pays/ajouter-pays.module').then( m => m.AjouterPaysPageModule)
  },
  {
    path: 'add-voyage',
    loadChildren: () => import('./add-voyage/add-voyage.module').then( m => m.AddVoyagePageModule)
  },
  {
    path: 'reserve-voyage',
    loadChildren: () => import('./reserve-voyage/reserve-voyage.module').then( m => m.ReserveVoyagePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
