import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBetPageRoutingModule } from './new-bet-routing.module';

import { NewBetPage } from './new-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewBetPage]
})
export class NewBetPageModule {}
