import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
import Ville, { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage {
  private ville: Ville = new Ville();
  private imagePth = [];
  private task: AngularFireUploadTask;
  private ref: AngularFireStorageReference;
  private pays = [];

  constructor(private data: DataService,
    private storage: AngularFireStorage,
  ) {
    this.lister_pays();
  }

  lister_pays() {
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

  async onFileSelected(event) {
    const path =event.target.files[0]['name'];
    this.ref = this.storage.ref(path);
    this.task = this.ref.put(event.target.files[0]);
    await this.task.then(res => {
      res.ref.getDownloadURL().then(url => {
        this.imagePth.push(url);
      })
    })
  }

  addCity(): void {
    this.ville.image=this.imagePth;
    console.log(this.ville.image);
    this.data.cree_Ville(this.ville).then(() => {
      console.log('ville a ete ajouter!');
    });
  }

  clear(): void {
    this.ville.libelle = "";
    this.ville.pays = "";
    this.ville.desc = "";
  }
}
