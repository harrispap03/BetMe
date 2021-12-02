import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsArchivePage } from './bets-archive.page';

const routes: Routes = [
  {
    path: '',
    component: BetsArchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetsArchivePageRoutingModule {}
