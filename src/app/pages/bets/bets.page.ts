import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { SettleBetPage } from 'src/app/components/settle-bet/settle-bet.page';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/bet.service';
import { Bet } from 'src/models/bet';
import { User } from 'src/models/user';
@Component({
  selector: 'app-bets',
  templateUrl: 'bets.page.html',
  styleUrls: ['bets.page.scss'],
})
export class BetsPage {
  inParticipatingSegment = true;
  betsCreatedByUser;
  betsUserParticipatesIn = [];
  userActiveBets;
  preparedBets;
  user;
  constructor(
    public authService: AuthService,
    private betService: BetService,
    public modalController: ModalController,
    private router: Router
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
      if (user) {
        this.userActiveBets = user.activeBets;
        this.betsUserParticipatesIn = this.betService.getBetsUserParticipatesIn(
          user.activeBets
        );
        this.betService.getBetsCreatedByUser(user.id).subscribe((val) => {
          this.betsCreatedByUser = val;
          this.fillIn();
        });
      }
    });
  }
  fillIn() {
    this.preparedBets = this.betsUserParticipatesIn.map((bet) => ({
      bet, // keep the bet
      userBet: this.userActiveBets.find(({ betId }) => bet.id === betId),
    }));
  }

  segmentChanged(event) {
    this.inParticipatingSegment = !this.inParticipatingSegment;
  }

  async onSettleBet(bet) {
    const modal = await this.modalController.create({
      component: SettleBetPage,
      componentProps: {
        bet,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.winner) {
        this.betService.settleBet(data.data.winner, bet.id);
      } else {
        console.log('winners undefined');
        return;
      }
    });
    return await modal.present();
  }

  navigateToUserProfile() {
    this.router.navigate(['user-profile']);
  }

  navigateToMainFeed() {
    this.router.navigate(['home']);
  }
}
