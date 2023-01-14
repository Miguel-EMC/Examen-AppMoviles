import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(public menuController: MenuController) { }

  ngOnInit() {
  }
  openMenu(){
    console.log('open menu');
    this.menuController.toggle('principal');
   }
}
