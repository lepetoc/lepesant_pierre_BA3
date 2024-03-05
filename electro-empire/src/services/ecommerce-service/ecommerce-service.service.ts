import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IArticle, IUser } from '../../interfaces/ecommerce';
import { IArticlePanier } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http
      .get<IArticle[]>('https://www.eleguen.ovh/api/v1/articles')
      .pipe(
        map((data: IArticle[]) => {
          return data.map((article: IArticle) => {
            return {
              Name: article.Name,
              'Closet Image': article['Closet Image'],
              'Seasonal Availability': article['Seasonal Availability'],
              Buy: article.Buy,
              'Unique Entry ID': article['Unique Entry ID'],
            };
          });
        })
      );
  }

  finalizeCart(articles: IArticlePanier[], user: IUser): Observable<Object> {
    return this.http.post<Object>(
      'https://www.eleguen.ovh/api/v1/purchase',
      JSON.stringify({ panier: articles, user: user })
    );
  }
}
