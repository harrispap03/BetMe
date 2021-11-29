import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettleBetPageRoutingModule } from './settle-bet-routing.module';

import { SettleBetPage } from './settle-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettleBetPageRoutingModule
  ],
  declarations: [SettleBetPage]
})
export class SettleBetPageModule {}
