import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Voyage } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class DataTripService {
  voyages: AngularFireList<Voyage> = null;
  id;

  constructor(private db: AngularFireDatabase) {
    this.voyages = db.list('/voyages');
  }

  lister_voyages(): AngularFireList<Voyage> {
    return this.voyages;
  }

  creer_voyage(v: Voyage): any {
    return this.voyages.push(v);
  }

}
