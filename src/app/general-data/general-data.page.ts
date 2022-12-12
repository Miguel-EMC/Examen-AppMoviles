import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.page.html',
  styleUrls: ['./general-data.page.scss'],
})
export class GeneralDataPage implements OnInit {

  
  latitud :number | undefined;
  longitud :number | undefined;

  name: string;
  last_name: string;
  cedula: string;
  num_family: number;

  private path = 'datos generales de personas censadas/';

  constructor(public menuControler: MenuController,
    public fitestoreService: FirestoreService) { }
  ngOnInit() {
  }
  async getLocation(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
   }

  openMenu() {
    this.menuControler.toggle('principal');
  }
  guardarInfo(){
    const data = {
      nombre: this.name,
      apellido: this.last_name,
      cedula: this.cedula,
      num_familia: this.num_family,
      latitud: this.latitud,
      longitud: this.longitud
    };
    const id = this.fitestoreService.getId();
    this.fitestoreService.createData(data,this.path,id);
  };
}
