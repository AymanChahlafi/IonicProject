import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVoyagePage } from './add-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: AddVoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVoyagePageRoutingModule {}
