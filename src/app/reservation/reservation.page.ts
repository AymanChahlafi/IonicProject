import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService, Reservation, User, Voyage } from '../services/data.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  private reservation= new Reservation;
  private currentUser =new User;
  private voyage =new Voyage;
  
  constructor(private data: DataService,
    private voyageId: DataTripService,
    private alert: AlertController,
    private router: Router) {}

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

    this.voyageId.lister_voyages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.voyage = data.filter(res => {
        if(res.id === this.voyageId.id){
          return res;
        } 
      })[0]
    }); 
  }

  async addReservation() {
    this.reservation.uid = this.data.user;
    this.data.creer_Reservation(this.reservation);
  }

}
