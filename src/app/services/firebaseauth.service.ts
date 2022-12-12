import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) {
    this.getuid();
   }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  async getuid(){
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    }else{
      return user.uid;
    }
  }
  stateAuth(){
    return this.auth.authState;
  }
}
