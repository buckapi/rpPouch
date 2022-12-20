import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
{ path:'', redirectTo: '/sumary', pathMatch:'full'},
{ path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule),canActivate: [AuthGuard]},
{ path: 'login', loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule) },
{ path: 'notifications', loadChildren: () => import('./components/pages/notifications/notifications.module').then(m => m.NotificationsModule) },
{ path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
{ path: 'contact', loadChildren: () => import('./components/pages/contact/contact.module').then(m => m.ContactModule) },
{ path: 'product', loadChildren: () => import('./components/pages/product/product.module').then(m => m.ProductModule) },
{ path: 'cart', loadChildren: () => import('./components/pages/cart/cart.module').then(m => m.CartModule) },
{ path: 'checkout', loadChildren: () => import('./components/pages/checkout/checkout.module').then(m => m.CheckoutModule) },
{ path: 'estilistas', loadChildren: () => import('./components/pages/shop/shop.module').then(m => m.ShopModule) },
{ path: 'rastrea', loadChildren: () => import('./components/pages/rastrea/rastrea.module').then(m => m.RastreaModule) },
{ path: 'promos', loadChildren: () => import('./components/pages/promos/promos.module').then(m => m.PromosModule) },
{ path: 'detail', loadChildren: () => import('./components/pages/detail/detail.module').then(m => m.DetailModule) },
{ path: 'order', loadChildren: () => import('./components/pages/order/order.module').then(m => m.OrderModule) },
{ path: 'newproduct', loadChildren: () => import('./components/pages/newproduct/newproduct.module').then(m => m.NewproductModule) },
{ path: 'labcelhome', loadChildren: () => import('./components/pages/home/labcelhome/labcelhome.module').then(m => m.LabcelhomeModule) },
{ path: 'labceltransactions', loadChildren: () => import('./components/pages/labcel/transactions/transactions.module').then(m => m.TransactionsModule),canActivate: [AuthGuard]  },
{ path: 'labceladdtransaction', loadChildren: () => import('./components/pages/labcel/addtransaction/addtransaction.module').then(m => m.AddtransactionModule),canActivate: [AuthGuard] },
{ path: 'labcelhistory', loadChildren: () => import('./components/pages/labcel/history/history.module').then(m => m.HistoryModule),canActivate: [AuthGuard]  },
{ path: 'labcelout', loadChildren: () => import('./components/pages/labcel/out/out.module').then(m => m.OutModule) },
{ path: 'outregister', loadChildren: () => import('./components/pages/labcel/outregister/outregister.module').then(m => m.OutregisterModule) },
{ path: 'cierrecaja', loadChildren: () => import('./components/pages/labcel/cierrecaja/cierrecaja.module').then(m => m.CierrecajaModule) },
{ path: 'account', loadChildren: () => import('./components/pages/account/account.module').then(m => m.AccountModule) },
{ path: 'succes', loadChildren: () => import('./components/pages/succes/succes.module').then(m => m.SuccesModule) },
{ path: 'terms', loadChildren: () => import('./components/pages/terms/terms.module').then(m => m.TermsModule) },
{ path: 'shops', loadChildren: () => import('./components/pages/shops/shops.module').then(m => m.ShopsModule) },
{ path: 'member', loadChildren: () => import('./components/pages/member/member.module').then(m => m.MemberModule) },
{ path: 'sumary', loadChildren: () => import('./components/pages/sumary/sumary.module').then(m => m.SumaryModule) },
{ path: 'specialties', loadChildren: () => import('./components/pages/specialties/specialties.module').then(m => m.SpecialtiesModule) },
{ path: 'services', loadChildren: () => import('./components/pages/services/services.module').then(m => m.ServicesModule) },
{ path: 'settings', loadChildren: () => import('./components/pages/settings/settings.module').then(m => m.SettingsModule) },
{ path: 'tickets', loadChildren: () => import('./components/pages/tickets/tickets.module').then(m => m.TicketsModule) },
{ path: 'ticketsuccess', loadChildren: () => import('./components/pages/ticketsuccess/ticketsuccess.module').then(m => m.TicketsuccessModule) },
{ path: 'stylists', loadChildren: () => import('./components/pages/stylists/stylists.module').then(m => m.StylistsModule) },
{ path: 'cierre', loadChildren: () => import('./components/pages/cierre/cierre.module').then(m => m.CierreModule) },
{ path: 'closelist', loadChildren: () => import('./components/pages/closelist/closelist.module').then(m => m.CloselistModule) },
 { path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
