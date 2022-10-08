import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefacePage } from './preface.page';

const routes: Routes = [
  {
    path: '',
    component: PrefacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefacePageRoutingModule {}
