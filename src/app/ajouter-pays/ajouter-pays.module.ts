import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterPaysPageRoutingModule } from './ajouter-pays-routing.module';

import { AjouterPaysPage } from './ajouter-pays.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterPaysPageRoutingModule
  ],
  declarations: [AjouterPaysPage]
})
export class AjouterPaysPageModule {}
