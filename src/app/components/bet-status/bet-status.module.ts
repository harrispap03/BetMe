import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BetStatusComponent } from './bet-status.component';

@NgModule({
  declarations:[
    BetStatusComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[BetStatusComponent]
})
export class BetStatusModule{}
