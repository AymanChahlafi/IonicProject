import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveVoyagePage } from './reserve-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveVoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveVoyagePageRoutingModule {}
