import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralDataPageRoutingModule } from './general-data-routing.module';

import { GeneralDataPage } from './general-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralDataPageRoutingModule
  ],
  declarations: [GeneralDataPage]
})
export class GeneralDataPageModule {}
