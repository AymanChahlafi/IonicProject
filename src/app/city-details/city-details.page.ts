import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import Ville, { DataService } from '../services/data.service';
import { UpdateCityPage } from '../update-city/update-city.page';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
})
export class CityDetailsPage implements OnInit {
  private ville: Ville;

  constructor(private router: Router,
    private data: DataService,
    private activedRoute: ActivatedRoute,
    private alert: AlertController,
    private updateModel: ModalController 
  ) {}

  ngOnInit() {
    let libelle = this.activedRoute.snapshot.paramMap.get('id');
    this.data.lister_Villes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ville = data.filter(res => {
        return res.libelle == libelle;
      })[0];
    });
  }

  async updatedCity () {
    const modal = await this.updateModel.create({
      component: UpdateCityPage,
      componentProps: {city: this.ville},
      breakpoints: [0, 0.5, 0.75],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  deleteCity() {
    this.alert.create({header: 'Avertissement', message: 'voulez-vous vraiment supprimer cette ville?',
    buttons:[
      {
        text: 'cancel',
        role: 'cancel'
      },
      {
        text: 'delete',
        handler: () => {
          this.data.supprimer_Ville(this.ville.id);
          this.router.navigate(['../home']);
        }
      }
    ]
    })
    .then(alert => {
      alert.present();
    });
  }
}
