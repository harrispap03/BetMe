import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewBetPage } from 'src/app/components/new-bet/new-bet.page';

@Component({
  selector: 'app-bets',
  templateUrl: 'bets.page.html',
  styleUrls: ['bets.page.scss'],
})
export class BetsPage {
  constructor(public modalController: ModalController) {}

  async popup() {
    const modal = await this.modalController.create({
      component: NewBetPage,
    });
    return await modal.present();
  }
}
