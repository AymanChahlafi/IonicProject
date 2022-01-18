import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveVoyagePageRoutingModule } from './reserve-voyage-routing.module';

import { ReserveVoyagePage } from './reserve-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveVoyagePageRoutingModule
  ],
  declarations: [ReserveVoyagePage]
})
export class ReserveVoyagePageModule {}
