import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
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
  loading: any;

  constructor(public menuControler: MenuController,
              public fitestoreService: FirestoreService,
              public loadingController: LoadingController) { }

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
    this.presentLoading();

    this.fitestoreService.createData(data,this.path,id).then(res => {
      this.loading.dismiss();
    }).catch(error => {
    });;
  };

  async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando..',
      duration: 2000
    });
    await this.loading.present();
    // const {role,data} = await loading.onDidDismiss();
    // console.log('Loading dismissed');
  }
}
