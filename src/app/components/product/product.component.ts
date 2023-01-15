import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() producto: Product;

  constructor() { }

  ngOnInit() {
    //console.log('El producto es: ', this.product);
  }

}
