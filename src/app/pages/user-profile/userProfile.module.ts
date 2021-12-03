import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfilePage } from './userProfile.page';

import { UserProfilePageRoutingModule } from './userProfile-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserProfilePage }]),
    UserProfilePageRoutingModule,
    HeaderModule,
  ],
  declarations: [UserProfilePage],
})
export class UserProfilePageModule {}
