import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Ville, { DataService, Pays } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pays: Pays[];
  villes: Ville[];
  tab: String[] = [];

  constructor(private router: Router, private data: DataService) {
    if(data.admin == true) {
      this.tab[0] = 'Pays';
      this.tab[1] = 'Ville';
      this.tab[2] = 'Voyage';
    }else {
      this.tab[0] = 'Home';
      this.tab[1] = 'Reservation';
      this.tab[2] = 'Historique';
    }

    this.loadVilles();
    this.data.lister_Pays().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.pays = data;
    });
  }
  
  options = {
    centeredSlides: false,
    spaceBetween: -80,
  };
  
  loadVilles() {
    this.data.lister_Villes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.villes = data;
    });

  }

  paySelectionner(pays) {
    this.data.lister_Villes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.villes = data.filter(res => {
        return res.pays == pays;
      });
    });
  }

  villeDetail(name) {
    console.log(name)
    this.router.navigate([`city-details/${name}`]);
  }

  menu(id) {
    if(this.data.admin == true) {
      if(id == 0)
        this.router.navigate(['ajouter-pays']);
      else if(id == 1)
        this.router.navigate(['add-city']);
      else if(id == 2)
        this.router.navigate(['add-voyage']);
    }else {
      if(id == 0)
        this.router.navigate(['home']);
      else if(id == 1)
        this.router.navigate(['trips']);
      else(id == 2)
        this.router.navigate(['list-reservation']);
    }
  }

}
