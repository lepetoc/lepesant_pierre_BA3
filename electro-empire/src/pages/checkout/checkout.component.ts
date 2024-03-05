import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/ecommerce';
import { EcommerceService } from '../../services/ecommerce-service/ecommerce-service.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit{
  public form: FormGroup;
  public today : string;
  constructor(private router : Router, private eCommerceService : EcommerceService) {
    this.today = new Date().toISOString().split('T')[0];
    this.form = new FormGroup({
      lastname: new FormControl(),
      firstname: new FormControl(),
      adress: new FormControl(),
      zipcode: new FormControl(),
      city: new FormControl(),
      card: new FormControl(),
      cardDate: new FormControl(),
    });
  }

  get checkoutForm() {
    return this.form.controls;
  }

  ngOnInit() {
    if(CartService.IsCartEmpty()) {
      this.router.navigate(['/']);
    }
  }

  OnSubmit() {
    console.log(this.form.value);
    const userData : IUser = this.form.value;
    this.eCommerceService.finalizeCart(CartService.getItems(), userData).subscribe({
      next: (data) => {
        console.log(data);
        // CartService.clearCart();
        // this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  OnCancel(){
    CartService.clearCart();
    this.router.navigate(['/']);
  }
}
