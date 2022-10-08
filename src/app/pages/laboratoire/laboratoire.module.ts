import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboratoirePageRoutingModule } from './laboratoire-routing.module';

import { LaboratoirePage } from './laboratoire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboratoirePageRoutingModule
  ],
  declarations: [LaboratoirePage]
})
export class LaboratoirePageModule {}
