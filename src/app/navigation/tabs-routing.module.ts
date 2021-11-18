import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'bets',
        loadChildren: () => import('../pages/bets/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
