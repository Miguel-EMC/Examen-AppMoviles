import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';
import { Profile } from './models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: Profile = {
    uid: '',
    email: '',
    celular: '',
    nombre: '',
    foto: '',
  };
  newFile = '';
  uid = '';
  suscriberUserInfo: Subscription;
  ingresarEnabled = false;

  constructor(public menuControler: MenuController,
              public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public firestorageService: FirestorageService) {
                this.firebaseauthService.stateAuth().subscribe( res => {
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
    const uid = await this.firebaseauthService.getUid();
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
    };
  }

  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
         this.profile.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
   }
   async registrar(){
    const credenciales = {
      email: this.profile.email,
      password: this.profile.celular
    };
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch(err => {
      console.log('Error: ', err);
    });
    const uid = await this.firebaseauthService.getUid();
    this.profile.uid = uid;
    this.guardarUser();
   }
   async guardarUser(){
    const path = 'Users';
    const name = this.profile.nombre;
    if (this.newFile !== undefined){
      const res = await this.firestorageService.uploadImage(this.newFile,path,name);
      this.profile.foto = res;
    }
    this.firestoreService.createDoc(this.profile, path, this.profile.uid).then( () => {
      console.log('Usuario guardado con exito');
    }).catch( error => {
      console.log('Error al guardar el usuario');
    });
   }

   async salir(){
    this.firebaseauthService.logout();
    this.suscriberUserInfo.unsubscribe();
    console.log('Saliendo...');
   }

   getUserInfo(uid: string){
    const path = 'Users';
    this.suscriberUserInfo = this.firestoreService.getDoc<Profile>(path, uid).subscribe( res => {
      this.profile = res;
    });
   }

   ingresar(){
    const credenciales = {
      email: this.profile.email,
      password: this.profile.celular
    };
    this.firebaseauthService.login(credenciales.email, credenciales.password).then( res => {
      console.log('Ingresando...');
    }).catch( error => {
      console.log('Error al ingresar');
    });
   }
}
