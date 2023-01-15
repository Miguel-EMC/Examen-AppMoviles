import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Product } from '../product/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private path = 'products';
  productos: Product[] = [];

  constructor(public menuControler: MenuController,
            public firestoreService: FirestoreService) {
              this.loadProducts();
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
