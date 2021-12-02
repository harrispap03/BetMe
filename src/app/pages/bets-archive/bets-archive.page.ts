import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/bet.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-bets-archive',
  templateUrl: './bets-archive.page.html',
  styleUrls: ['./bets-archive.page.scss'],
})
export class BetsArchivePage {
  inParticipatingSegment = true;
  betsCreatedByUser;
  betsUserParticipatesIn = [];
  userActiveBets;
  preparedBets;
  user;
  constructor(
    public authService: AuthService,
    private betService: BetService,
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

  segmentChanged() {
    this.inParticipatingSegment = !this.inParticipatingSegment;
  }

  navigateToUserProfile() {
    this.router.navigate(['user-profile']);
  }

  navigateToMainFeed() {
    this.router.navigate(['home']);
  }
}
