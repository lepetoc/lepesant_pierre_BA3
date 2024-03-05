import { Injectable } from '@angular/core';
import { IArticle } from '../../interfaces/ecommerce';
import { IArticlePanier } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public static items: IArticlePanier[] = [];
  constructor() {}

  public static addToCart(product: IArticle, amount: number) {
    if (product.Buy === "NFS") {
      return;
    }
    if (this.items.find((item) => item.id === product['Unique Entry ID'])) {
      this.items.find(
        (item) => item.id === product['Unique Entry ID']
      )!.quantity += amount;
    } else {
      this.items.push({
        id: product['Unique Entry ID'],
        name: product.Name,
        quantity: amount,
        price: parseInt(product.Buy),
        totalPrice: parseInt(product.Buy) * amount,
      });
    }
    var temp = this.items.find((item) => item.id === product['Unique Entry ID'])!;
    temp.totalPrice = temp.quantity * temp.price;
    console.log(this.items);
  }

  public static getItems() {
    return this.items;
  }

  public static clearCart() {
    this.items = [];
    return this.items;
  }

  public static removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    return this.items;
  }

  public static IsCartEmpty() {
    return this.items.length === 0;
  }
}
