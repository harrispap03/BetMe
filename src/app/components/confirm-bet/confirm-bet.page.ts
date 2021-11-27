import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  async onConfirmBet() {
    const betAmount = +this.betAmountString;
    this.betService.executeBetTransaction(
      this.user,
      this.selectedBet,
      betAmount,
      this.option,
      this.betChoice
    );
    console.log('type is', typeof betAmount);
  }
}
