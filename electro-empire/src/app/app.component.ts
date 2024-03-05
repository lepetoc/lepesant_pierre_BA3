import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { OnInit } from '@angular/core';
import { EcommerceService } from '../services/ecommerce-service/ecommerce-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  constructor(private eCommerceService: EcommerceService) {}

  ngOnInit() {
    this.eCommerceService.getArticles().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
