import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVoyagePageRoutingModule } from './add-voyage-routing.module';

import { AddVoyagePage } from './add-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVoyagePageRoutingModule
  ],
  declarations: [AddVoyagePage]
})
export class AddVoyagePageModule {}
