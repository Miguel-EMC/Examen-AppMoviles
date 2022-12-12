import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { getuid } from 'process';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: string;
  last_name: string;
  email: string;

  constructor(public menuControler: MenuController,
              public firebaseauthService: FirebaseauthService) {
                this.firebaseauthService.stateAuth().subscribe(res => {
                  if (res !== null) {
                    console.log('user is logged in');
                  }else{
                    console.log('user is not logged in');
                  }
                });
              }

  ngOnInit() {
    const uid = this.firebaseauthService.getuid();
    console.log(uid);
  }
  openMenu() {
    this.menuControler.toggle('principal');
  }
  async registrar(){
    const credentiales = {
      email: this.email,
      password: this.name,
    };
    const res = await this.firebaseauthService.register(credentiales.email,credentiales.password);
    console.log(res);
    const uid = this.firebaseauthService.getuid();
    console.log(uid);
  }

  salir(){
    // const uid = this.firebaseauthService.getuid();
    // console.log(uid);
    this.firebaseauthService.logout();
  }
  getUserInfo(uid: string){
    const path = 'users/' + uid;
  }

}
