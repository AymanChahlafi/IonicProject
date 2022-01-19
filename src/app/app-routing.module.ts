import { NgModule, ViewChild, ViewChildren } from '@angular/core';
import { ChildrenOutletContexts, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
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
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
