import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private navCtrl: NavController) {
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 5000);
  }

  ngOnInit() {
  }

}
