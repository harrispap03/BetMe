import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfilePage } from './userProfile.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { UserProfilePageRoutingModule } from './userProfile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: UserProfilePage }]),
    UserProfilePageRoutingModule,
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}