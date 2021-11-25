import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmBetPage } from './confirm-bet.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmBetPageRoutingModule {}
