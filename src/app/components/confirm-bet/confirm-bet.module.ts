import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmBetPageRoutingModule } from './confirm-bet-routing.module';

import { ConfirmBetPage } from './confirm-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmBetPageRoutingModule
  ],
  declarations: [ConfirmBetPage]
})
export class ConfirmBetPageModule {}
