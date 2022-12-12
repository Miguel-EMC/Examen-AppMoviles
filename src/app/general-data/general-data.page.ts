import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Geolocation } from '@capacitor/geolocation';
import { FirestorageService } from '../services/firestorage.service';
import { async } from '@firebase/util';

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
  loading: any;
  foto: any;
  newImage: any;
  newFile: any;
  private path = 'datos generales de personas censadas/';

  constructor(public menuControler: MenuController,
              public fitestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public firestorageService: FirestorageService) { }
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
  async guardarInfo(){

    const path = 'Imagenes de personas censadas/';
    const name = this.name;
    const res = await this.firestorageService.uploadImage(this.newFile,path,name);
    this.foto = res;
    const data = {
      nombre: this.name,
      apellido: this.last_name,
      cedula: this.cedula,
      num_familia: this.num_family,
      latitud: this.latitud,
      longitud: this.longitud,
      foto: this.foto
    };
    const id = this.fitestoreService.getId();
    this.presentLoading();
    this.fitestoreService.createData(data,this.path,id).then(res => {
      this.loading.dismiss();
      this.presentToast('Datos guardados con exito');
    }).catch(error => {
    });
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
  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
   }

  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
         this.newImage = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
