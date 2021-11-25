import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./navigation/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'new-bet',
    loadChildren: () => import('./components/new-bet/new-bet.module').then( m => m.NewBetPageModule)
  },  {
    path: 'confirm-bet',
    loadChildren: () => import('./components/confirm-bet/confirm-bet.module').then( m => m.ConfirmBetPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
