import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService, Reservation, User, Voyage } from '../services/data.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.page.html',
  styleUrls: ['./list-reservation.page.scss'],
})
export class ListReservationPage implements OnInit {
  private voyages: Voyage[];
  private voyage: Voyage;
  private reservation: Reservation;
  private reservations: Reservation[];
  private currentUser = new User;

  constructor(private data: DataService,
    private voyageData: DataTripService,
    private toast: ToastController
    ) {
     this.loadReservation();
    }

  ngOnInit() {
    this.data.lister_Users().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.currentUser = data.filter(res => {
        if(res.id === this.data.user){
          this.currentUser.fullname = res.fullname;
          this.currentUser.email = res.email;
          return res;
        } 
      })[0]
    }); 
  }

  loadReservation() {
    this.data.lister_Reservations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.reservations = data.filter(res => (
        res.uid === this.data.user
      ));
    }); 
  }

  async showDetails(idTrip) {
    
  }

  async modifier_Reservation() {
    this.data.modifier_Reservation(this.reservation.id, this.reservation);
    const updateToast = await this.toast.create({
      message: 'City Updated',
      duration: 1000
    });
    updateToast.present();
  }

  async supprimer_Reservation(id) {
    await this.data.supprimer_Reservation(id);
    this.loadReservation();
  }

}
