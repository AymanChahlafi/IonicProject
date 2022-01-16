import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import Ville, { DataService } from '../services/data.service';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.page.html',
  styleUrls: ['./update-city.page.scss'],
})
export class UpdateCityPage implements OnInit {
  @Input() ville: Ville;
  private imagePth = [];

  constructor(private data: DataService,
     private model: ModalController,
     private toast: ToastController,
     private router: Router
  ) { }

  ngOnInit() {
  }

  async updateCity() {
    this.data.modifier_Ville(this.ville.id, this.ville);
    const updateToast = await this.toast.create({
      message: 'ville a été modifier',
      duration: 1000
    });
    updateToast.present();
  }

  async deleteCity() {
    await this.data.supprimer_Ville(this.ville.id);
    this.router.navigateByUrl('/home');
    this.model.dismiss();
  }

}
