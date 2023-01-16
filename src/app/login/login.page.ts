import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';
import { Profile } from './models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profile: Profile = {
    uid: '',
    email: '',
    celular: '',
    nombre: '',
    foto: '',
    password: '',
  };
  newFile = '';
  uid = '';
  suscriberUserInfo: Subscription;
  ingresarEnabled = false;
  profiles = null;
  loading: any;

  constructor(
    private authService: AuthService,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService,
    public menuControler: MenuController,
    public loadingController: LoadingController,
    public toastController: ToastController,


  ) {
    this.authService.stateAuth().subscribe( res => {
      console.log(res);
     if (res !== null){
      this.uid = res.uid;
      this.getUserInfo(this.uid);
     }else{
        this.initClinete();
     }
    });
  }
  async ngOnInit() {
    const uid = await this.authService.getUid();
    console.log(uid);
  }
  openMenu() {
    this.menuControler.toggle('principal');
  }

  initClinete(){
    this.uid = '';
    this.profile = {
      uid: '',
      email: '',
      celular: '',
      nombre: '',
      foto: '',
      password: '',
    };
  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.profile.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async registrar() {
    const credenciales = {
      email: this.profile.email,
      password: this.profile.password,
    };
    const res = await this.authService
      .register(credenciales.email, credenciales.password)
      .catch((err) => {
        console.log('Error: ', err);
      });
    const uid = await this.authService.getUid();
    this.profile.uid = uid;
    this.guardarUser();
  }
  async guardarUser() {
    const path = 'Users';
    const name = this.profile.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(
        this.newFile,
        path,
        name
      );
      this.profile.foto = res;
    }
    this.firestoreService
      .createDoc(this.profile, path, this.profile.uid)
      .then(() => {
        console.log('Usuario guardado con exito');
        this.presentToast('Usuario guardado con exito');

      })
      .catch((error) => {
        console.log('Error al guardar el usuario');
        this.presentToast('Error al guardar el usuario');
      });
  }

  async ingresar() {
    const credenciales = {
      email: this.profile.email,
      password: this.profile.password,
    };
    this.authService
      .login(credenciales.email, credenciales.password)
      .then((res) => {
        this.presentToast('Bienvenido');
      })
      .catch((error) => {
        console.log('Error al ingresar');
        this.presentToast('Error al ingresar');
      });
  }
  async salir() {
    this.authService.logout();
    this.suscriberUserInfo.unsubscribe();
    console.log('Saliendo...');
  }
  getUserInfo(uid: string){
    const path = 'Users';
    this.suscriberUserInfo = this.firestoreService.getDoc<Profile>(path, uid).subscribe( res => {
      this.profile = res;
    });
   }
   async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'normal',
      duration: 2000
    });
    toast.present();
   }

}
