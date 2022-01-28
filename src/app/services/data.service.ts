import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

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
  prix: number;
  vdepart: string;
  vFin: string;
  image: 'https://i.pinimg.com/236x/cb/67/1c/cb671c95dca1d2b8082f90935378f016.jpg';
  id: string;
}

export class Reservation {
  id: string;
  uid: string;
  mobile: string;
  voyageId: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  villes: AngularFireList<Ville> = null;
  pays: AngularFireList<Pays> = null;
  voyages: AngularFireList<Voyage> = null;
  users: AngularFireList<User> = null;
  reserves: AngularFireList<Reservation> = null;
  villeVoyages;
  user;
  admin = false;

  constructor(private db: AngularFireDatabase) {
    console.log(this.villes);
    this.villes = db.list('/villes');
    this.pays = db.list('/pays');
    this.voyages = db.list('/voyages');
    this.reserves = db.list('/reserves');
  }

  lister_voyages(): AngularFireList<Voyage> {
    return this.voyages;
  }

  creer_voyage(v: Voyage): any {
    return this.voyages.push(v);
  }

  lister_Villes(): AngularFireList<Ville> {
    return this.villes;
  }

  cree_Ville(ville: Ville): any {
    return this.villes.push(ville);
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
    return this.reserves;
  }

  creer_Reservation(reservation: Reservation): any {
    this.db.object('/reserves/' + Math.random().toString(29).substring(3)).set({
      mobile: reservation.mobile,
      voyageId: reservation.voyageId,
      uid: reservation.uid,
    });
  }

  supprimer_Reservation(id: string): Promise<void> {
    return this.reserves.remove(id);
  }
}
