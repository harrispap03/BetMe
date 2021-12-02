import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ConfirmBetPage } from 'src/app/components/confirm-bet/confirm-bet.page';
import { NewBetPage } from 'src/app/components/new-bet/new-bet.page';
import { BetService } from 'src/app/services/bet.service';
import { Bet } from 'src/models/bet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) inifiniteScroll: IonInfiniteScroll;

  constructor(
    public modalController: ModalController,
    public betService: BetService
  ) {}

  ngOnInit() {
    this.betService.init('bets', 'createdAt', {
      reverse: true,
      prepend: false,
    });
  }

  onRefresh(event) {
    this.betService.init('bets', 'createdAt', {
      reverse: true,
      prepend: false,
    });
    event.target.complete();
  }

  async addNewBetPopup() {
    const modal = await this.modalController.create({
      component: NewBetPage,
    });
    return await modal.present();
  }

  async onBetChoiceMade(selectedBet: Bet, betChoice: any, option: number) {
    const modal = await this.modalController.create({
      component: ConfirmBetPage,
      componentProps: {
        selectedBet,
        betChoice,
        option,
      },
    });
    return await modal.present();
  }

  loadData(event) {
    setTimeout(() => {
      this.betService.more();
      event.target.complete(); // Why do I have to call this ?
    }, 500);
  }

  toggleInfiniteScroll() {
    this.inifiniteScroll.disabled = !this.inifiniteScroll.disabled;
    console.log('Toggled');
  }
}
