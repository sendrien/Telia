import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProduitPageRoutingModule } from './info-produit-routing.module';

import { InfoProduitPage } from './info-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProduitPageRoutingModule
  ],
  declarations: [InfoProduitPage]
})
export class InfoProduitPageModule {}
