import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage  {
  private voyages;
  private dateDebut= new Date('');
  private search = '';

  constructor(private data: DataTripService, private router: Router) {
    this.loadTrip();
  }

  loadTrip() {    
    this.data.lister_voyages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.voyages = data;
    });
  }

  searchTrips() {
    if(this.dateDebut)
      this.searchWithCity();
    else if(!this.search) 
      this.searchWithDate();
  }

  searchWithCity() {
    this.data.lister_voyages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.voyages = data.filter(res => {
        return res.vdepart === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.vFin === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
      });
    });  
  }

  searchWithDate() {
    
    if(this.dateDebut)
    {     
      console.log(this.dateDebut)
      this.data.lister_voyages().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.voyages = data.filter(res => {
          return this.isDatesEqual(this.dateDebut,res.debut);
        });
      });
    }
  }

  isDatesEqual(start, end) {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    return (dateStart.getFullYear() >= dateEnd.getFullYear() &&
    dateStart.getMonth() >= dateEnd.getMonth() &&
    dateStart.getDate() >= dateEnd.getDate()) 
    || 
    ( dateStart.getFullYear() === dateEnd.getFullYear() &&
    dateStart.getMonth() === dateEnd.getMonth() &&
    dateStart.getDate() === dateEnd.getDate());
  }

  refresh() {
    this.dateDebut = new Date('');
    this.search = '';
    this.loadTrip();
  }

  back() {
    this.router.navigate(['/home']);
  }

}
