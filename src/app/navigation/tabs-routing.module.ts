import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'confirmBetPage',
        loadChildren: () =>
          import('../components/confirm-bet/confirm-bet.module').then(
            (m) => m.ConfirmBetPageModule
          ),
      },
      {
        path: 'bets-archive',
        loadChildren: () =>
          import('../pages/bets-archive/bets-archive.module').then(
            (m) => m.BetsArchivePageModule
          ),
      },
      {
        path: 'bets',
        loadChildren: () =>
          import('../pages/bets/bets.module').then((m) => m.BetsPageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../pages/user-profile/userProfile.module').then(
            (m) => m.UserProfilePageModule
          ),
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('../pages/welcome/welcome.module').then(
            (m) => m.WelcomePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
