import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
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

  constructor(
    private authService: AuthService,
    private betService: BetService
  ) {
    this.authService.user$.pipe(take(1)).subscribe((user: User) => {
      this.userActiveBets = user.activeBets;
      this.betsUserParticipatesIn = this.betService.getBetsUserParticipatesIn(
        user.activeBets
      );
      this.betService.getBetsCreatedByUser(user.id).subscribe((val) => {
        this.betsCreatedByUser = val;
        this.fillIn();
      });
    });
  }
  fillIn() {
    this.preparedBets = this.betsUserParticipatesIn.map((bet) => ({
      bet, // keep the bet
      userBet: this.userActiveBets.find(({ betId }) => bet.id === betId),
    }));
    console.log('prepy', this.preparedBets);
  }

  test() {
    this.fillIn();
    console.log('betsUserParticipatesIn', this.betsUserParticipatesIn);
    console.log('createdByUser', this.betsCreatedByUser);
    console.log(this.userActiveBets);
  }

  segmentChanged(event) {
    this.inParticipatingSegment = !this.inParticipatingSegment;
  }

  // get current User bet ids
  // use the bet ids to get the bets
  // display the bets
}
