import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  apiPath = " http://localhost:3001/products";

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiPath, product).pipe(
      map((object) => object),
      catchError(this.handleError)
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiPath).pipe(
      map((object) => object),
      catchError(this.handleError)
    );
  }

  readById(id: string | null): Observable<Product> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((object) => object),
      catchError(this.handleError)
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.apiPath}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((object) => object),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<null> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete<null>(url).pipe(
      map((object) => object),
      catchError(this.handleError)
    );
  }

  // protected method

  protected handleError(error: any) {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
