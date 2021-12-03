import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations:[HeaderComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
