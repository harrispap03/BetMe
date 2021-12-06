import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/bet.service';
import { Bet } from 'src/models/bet';
import { User } from 'src/models/user';

@Component({
  selector: 'app-confirm-bet',
  templateUrl: './confirm-bet.page.html',
  styleUrls: ['./confirm-bet.page.scss'],
})
export class ConfirmBetPage implements OnInit {
  @Input() option: number;
  @Input() selectedBet: Bet; // comes from home
  @Input() betChoice: string; // comes from home
  @ViewChild('betAmountString') betAmountString: string; // this component

  // All those set from the service
  user: User;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public authService: AuthService,
    public betService: BetService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Data',
      subHeader: 'You have to enter the amount you want to bet',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async onConfirmBet() {
    const betAmount = +this.betAmountString;
    if (isNaN(betAmount)) {
      this.presentAlert();
      return;
    }
    this.betService.executeBetTransaction(
      this.user,
      this.selectedBet,
      betAmount,
      this.option,
      this.betChoice
    );
    this.modalController.dismiss();
  }
}
