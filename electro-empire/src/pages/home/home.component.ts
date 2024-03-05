import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceService } from '../../services/ecommerce-service/ecommerce-service.service';
import { IArticle } from '../../interfaces/ecommerce';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private ecommerceService: EcommerceService, private cartService: CartService) { 
  }

  public articles : IArticle[] = [];

  ngOnInit() {
    this.ecommerceService.getArticles().subscribe({
      next: (data) => {
        data.forEach((article) => {
          this.articles.push(article);
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  OnSubmit(product: IArticle, amount: number) {
    CartService.addToCart(product, amount);
  }
}
