import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { HomeComponent } from '../pages/home/home.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
