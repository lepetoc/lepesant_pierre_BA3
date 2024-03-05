import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service/cart.service';
import { OnInit } from '@angular/core';
import { IArticlePanier } from '../../interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit{
  public items = CartService.getItems();
  public total = 0;
  ngOnInit(): void {
    this.CalculateCartTotal();
  }
  CalculateTotal(item: IArticlePanier, newAmount : number) {
    item.quantity = newAmount;
    item.totalPrice = item.price * newAmount;
    this.total = 0;
    this.CalculateCartTotal();
  }

  CalculateCartTotal() {
    var temp : number;
    this.items.forEach((item) => {
      temp = item.totalPrice;
      this.total += temp;
    });
  }
  RemoveItem(id: string) {
    this.items = CartService.removeItem(id);
    this.total = 0;
    this.CalculateCartTotal();
  }

  ClearCart() {
    this.items = CartService.clearCart();
    this.total = 0;
  }
}
