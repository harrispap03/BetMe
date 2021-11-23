import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NewBetPage } from 'src/app/components/new-bet/new-bet.page';
import { BetService } from 'src/app/services/bet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

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
  async popup() {
    const modal = await this.modalController.create({
      component: NewBetPage,
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
