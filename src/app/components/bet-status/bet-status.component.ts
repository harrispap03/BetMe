import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-bet-status',
  templateUrl: './bet-status.component.html',
  styleUrls: ['./bet-status.component.scss'],
})
export class BetStatusComponent implements OnInit {
  @Input() displayOption;
  @Input() bet;
  @Input() winningOption;
  wonOrLost: string;

  winningOptionName;
  constructor() {}

  ngOnInit() {
    if (this.displayOption === 'amountChoiceAndOutcome') {
      if (this.bet.userBet.choice === this.winningOption) {
        this.wonOrLost = 'won!';
      } else {
        this.wonOrLost = 'lost';
      }
    }

    if (this.displayOption === 'outcome') {
      if (this.bet.winningOption === 1) {
        this.winningOptionName = this.bet.optionOneName;
      } else {
        this.winningOptionName = this.bet.optionTwoName;
      }
    }
  }

  click() {
    console.log(this.bet);
  }
}
