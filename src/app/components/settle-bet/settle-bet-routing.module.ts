import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettleBetPage } from './settle-bet.page';

const routes: Routes = [
  {
    path: '',
    component: SettleBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettleBetPageRoutingModule {}
