import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

export default class Ville {
  id?: string;
  libelle: string;
  pays: string;
  desc: string;
  image?: string[];
}

export class Pays {
  nom: string;
  localisation: string;
  image: string;
}

export class User {
  email: string;
  fullname: string;
  password: string;
}

export class Voyage {
  debut: Date;
  fin: Date;
  image: string;
  prix: number;
  vdepart: string;
  vFin: string;
  id: string;
}

export class Reservation {
  id: string;
  uid: string;
  mobile: string;
  voyageId: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  villes: AngularFireList<Ville> = null;
  pays: AngularFireList<Pays> = null;
  users: AngularFireList<User> = null;
  reservations: AngularFireList<Reservation> = null;
  user = "bXqADMMuXxUQKLVy6XT6ui02hmT2";
  admin = false;

  constructor(private db: AngularFireDatabase) { 
    this.villes = db.list('/villes');
    this.pays = db.list('/pays');
  }

  lister_Villes(): AngularFireList<Ville> {
    return this.villes;
  }

  cree_Ville(ville: Ville): any {
    return this.villes.push(ville);
  }

  modifier_Ville(id: string, value: any): Promise<void> {
    return this.villes.update(id, value);
  }

  supprimer_Ville(id: string): Promise<void> {
    return this.villes.remove(id);
  }  

  lister_Pays(): AngularFireList<Pays> {
    return this.pays;
  }

  cree_Pays(pays: Pays): any {
    return this.pays.push(pays);
  }

  modifier_Pays(id: string, value: any): Promise<void> {
    return this.pays.update(id, value);
  }

  supprimer_Pays(id: string): Promise<void> {
    return this.pays.remove(id);
  }  

  lister_Users(): AngularFireList<User> {
    return this.users;
  }

  lister_Reservations(): AngularFireList<Reservation> {
    return this.reservations;
  }

  creer_Reservation(reservation: Reservation): any {
    this.db.object('/reservations/'+Math.random().toString(29).substring(3)).set({
      mobile: reservation.mobile,
      voyageId:reservation.voyageId,
      uid: reservation.uid
    });
  }

  modifier_Reservation(id: string, value: any): Promise<void> {
    return this.reservations.update(id, value);
  }

  supprimer_Reservation(id: string): Promise<void> {
    return this.reservations.remove(id);
  } 
}
