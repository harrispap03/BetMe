import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBetPage } from './new-bet.page';

const routes: Routes = [
  {
    path: '',
    component: NewBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBetPageRoutingModule {}
