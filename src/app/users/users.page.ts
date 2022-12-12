import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private path = 'Usuario que registra los datos/';

  name: string;
  last_name: string;
  cedula: string;
  num_houses: string;
  constructor(public menuControler: MenuController,
    public fitestoreService: FirestoreService) { }

  ngOnInit() {
  }
  openMenu() {
    this.menuControler.toggle('principal');
  }
  guardarInfo(){
    const data = {
      nombre: this.name,
      apellido: this.last_name,
      cedula: this.cedula,
      num_houses: this.num_houses,
    };
    const id = this.fitestoreService.getId();
    this.fitestoreService.createData(data,this.path,id);
  };
}
