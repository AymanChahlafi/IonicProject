import { Component, OnInit } from '@angular/core';
import { DataService, Reservation, Voyage } from '../services/data.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reserve-voyage',
  templateUrl: './reserve-voyage.page.html',
  styleUrls: ['./reserve-voyage.page.scss'],
})
export class ReserveVoyagePage implements OnInit {
  private voyages : Voyage[];
  

  constructor(private data: DataService,private alertC: AlertController) { }

  ngOnInit() {
    if(!this.data.villeVoyages) {
      this.data.lister_voyages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
      ).subscribe((data) => {
        this.voyages = data;
      });
    } else {
      this.data.lister_voyages().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
        ).subscribe((data) => {
          this.voyages = data.filter(res => {
            return res.vdepart === this.data.villeVoyages || res.vFin === this.data.villeVoyages;
          });
        });
    }
  }

  async alert(id) {

    const alert = await this.alertC.create({
      header: 'Reservation',
      inputs: [
        {
          name:'phone',
          type: 'number',
          placeholder: 'Phone Number: '
        }
      ],
      buttons: [
        {
          text: 'Confirmer',
          handler: (alert) => {
            var reservation = new Reservation;
            reservation.mobile = alert.phone;
            reservation.uid = this.data.user;
            reservation.voyageId = id;
            this.data.creer_Reservation(reservation);
           }
        }
      ]
    });

    await alert.present();
  }

  
}
