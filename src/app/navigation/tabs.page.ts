import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewBetPage } from '../components/new-bet/new-bet.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(public modalController: ModalController) {}

  async addNewBetPopup() {
    const modal = await this.modalController.create({
      component: NewBetPage,
    });
    return await modal.present();
  }
}
