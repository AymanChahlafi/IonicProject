import { Component, OnInit } from '@angular/core';
import { DataService, Voyage } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reserve-voyage',
  templateUrl: './reserve-voyage.page.html',
  styleUrls: ['./reserve-voyage.page.scss'],
})
export class ReserveVoyagePage implements OnInit {
  private voyages : Voyage[];

  constructor(private data: DataService) { }

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

  
}
