import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterPaysPage } from './ajouter-pays.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterPaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterPaysPageRoutingModule {}
