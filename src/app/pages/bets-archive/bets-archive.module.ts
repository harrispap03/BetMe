import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetsArchivePageRoutingModule } from './bets-archive-routing.module';

import { BetsArchivePage } from './bets-archive.page';
import { BetStatusModule } from 'src/app/components/bet-status/bet-status.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetsArchivePageRoutingModule,
    BetStatusModule,
    HeaderModule,
  ],
  declarations: [BetsArchivePage],
})
export class BetsArchivePageModule {}
