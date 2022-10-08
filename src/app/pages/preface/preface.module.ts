import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrefacePageRoutingModule } from './preface-routing.module';

import { PrefacePage } from './preface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrefacePageRoutingModule
  ],
  declarations: [PrefacePage]
})
export class PrefacePageModule {}
