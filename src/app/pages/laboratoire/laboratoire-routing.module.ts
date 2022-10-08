import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoirePage } from './laboratoire.page';

const routes: Routes = [
  {
    path: '',
    component: LaboratoirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoirePageRoutingModule {}
