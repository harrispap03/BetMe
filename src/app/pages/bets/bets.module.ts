import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BetsPage } from './bets.page';

import { BetsPageRoutingModule } from './bets-routing.module';
import { BetStatusModule } from 'src/app/components/bet-status/bet-status.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BetsPageRoutingModule,
    BetStatusModule,
    HeaderModule
  ],
  declarations: [BetsPage],
})
export class BetsPageModule {}
