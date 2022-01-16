import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { DataService, Pays } from '../services/data.service';

@Component({
  selector: 'app-ajouter-pays',
  templateUrl: './ajouter-pays.page.html',
  styleUrls: ['./ajouter-pays.page.scss'],
})
export class AjouterPaysPage implements OnInit {
  private pays: Pays = new Pays();
  private imagePth;
  private task: AngularFireUploadTask;
  private ref: AngularFireStorageReference;

  constructor(private data: DataService,
    private storage: AngularFireStorage,
    ) { }

  ngOnInit() {
  }

  async onFileSelected(event) {
    const path =event.target.files[0]['name'];
    this.ref = this.storage.ref(path);
    this.task = this.ref.put(event.target.files[0]);
    await this.task.then(res => {
      res.ref.getDownloadURL().then(url => {
        this.imagePth = url;
      })
    })
  }

  ajouter_pays(): void {
    this.pays.image=this.imagePth;
    console.log(this.pays.image);
    this.data.cree_Pays(this.pays).then(() => {
      console.log('pays a été ajouter!');
    });
  }

  clear(): void {
    this.pays.nom = "";
    this.pays.localisation = "";
  }
}
