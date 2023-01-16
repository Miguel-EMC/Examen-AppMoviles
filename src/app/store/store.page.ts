import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Product } from '../product/models';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage{

  private path = 'products';
  productos: Product[] = [];
  profile = null;

  constructor(
    private menuControler: MenuController,
    private firestoreService: FirestoreService,
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loadProducts();
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
   }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  openMenu() {
    this.menuControler.toggle('principal');
  }
  loadProducts(){
    this.firestoreService.getColeccion<Product>(this.path).subscribe(res => {
      //console.log(res);
      this.productos = res;
    });
  }

}
