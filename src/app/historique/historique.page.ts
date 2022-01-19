import { Component, OnInit } from '@angular/core';
import { DataService, Reservation, Voyage } from '../services/data.service';
import { map } from 'rxjs/operators';
import { reverse } from 'dns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  private voyages : Voyage[];

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.reservations();
  }

  reservations() {
    var result;
    this.data.lister_Reservations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      result = data.filter(res => (
         res.uid === this.data.user
      ));
    }); 

    this.data.lister_voyages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.voyages = data.filter(res => {
        return res.id===result.map(r => (r.voyageId)).toString().split(',').find(e => e ===res.id);
      });
    });
  }

  supprimer(id) {
    this.data.lister_Reservations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      data.filter(res => {
        if(res.voyageId === id) {
        this.data.supprimer_Reservation(res.id)
        }
      })[0];
      this.reservations();
    }); 
  }
}
