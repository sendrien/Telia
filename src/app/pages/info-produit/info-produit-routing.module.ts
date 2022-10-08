import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoProduitPage } from './info-produit.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProduitPageRoutingModule {}
