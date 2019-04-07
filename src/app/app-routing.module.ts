import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {ShopComponent} from './shop/shop.component';
import {TradeInpageComponent} from './trade-inpage/trade-inpage.component';
import {StorypageComponent} from './storypage/storypage.component';
import {AccountPageComponent} from './account-page/account-page.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'trade-in', component: TradeInpageComponent },
  { path: 'story', component: StorypageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
