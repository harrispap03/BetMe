import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settle-bet',
  templateUrl: './settle-bet.page.html',
  styleUrls: ['./settle-bet.page.scss'],
})
export class SettleBetPage implements OnInit {
  @Input() bet;
  winner;
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log('bet', this.bet);
  }

  getChoice(choice) {
    if (choice === 1) {
      this.winner = 1;
    } else {
      this.winner = 2;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      winner: this.winner,
    });
  }
}
