import { Component, OnInit } from '@angular/core';
import { DataService, Voyage } from '../services/data.service';

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.page.html',
  styleUrls: ['./add-voyage.page.scss'],
})
export class AddVoyagePage implements OnInit {
  private voyage: Voyage = new Voyage;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  addVoyage(): void {
    this.data.creer_voyage(this.voyage).then(() => {
      console.log(this.voyage);
    });
  }
}
