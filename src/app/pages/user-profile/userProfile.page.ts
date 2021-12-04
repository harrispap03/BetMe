import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActionSheetController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: 'userProfile.page.html',
  styleUrls: ['userProfile.page.scss'],
})
export class UserProfilePage {
  user;
  userId;
  userBalance: number;
  constructor(
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public afs: AngularFirestore
  ) {
    this.auth.user$.pipe(filter((user) => !!user)).subscribe((user) => {
      this.userBalance = user.balance;
      this.user = user;
    });
  }

  async addBalancePopup() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Add Balance',
      buttons: [
        {
          text: '$500',
          icon: 'cash',
          handler: () => {
            this.addBalance(500);
          },
        },
        {
          text: '$1000',
          icon: 'cash',
          handler: () => {
            this.addBalance(1000);
          },
        },
        {
          text: '$10000',
          icon: 'cash',
          handler: () => {
            this.addBalance(10000);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  addBalance(amountToAdd) {
    const data = {
      balance: this.userBalance + amountToAdd,
    };
    this.afs.collection('users').doc(this.user.id).set(data, { merge: true });
  }
}
