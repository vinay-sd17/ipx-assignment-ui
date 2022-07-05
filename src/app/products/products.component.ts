import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IProduct } from '../models/common.model';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  selectedCategory: string | null;
  products: IProduct[];
  categories: string[];
  searchSubscription: Subscription;

  searchSubject = new Subject<string>();

  constructor(private route: ActivatedRoute, private location: Location, private productService: ProductService) { }

  ngOnInit(): void {
    this.selectedCategory = this.route.snapshot.paramMap.get('category');

    const apiRequest = this.selectedCategory ?
      this.productService.getProductsByCategory(this.selectedCategory) :
      this.productService.getAllProducts();

    apiRequest.subscribe((res: any) => {
      this.products = res.products;
    });

    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res.sort();
    });

    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery: string) => {
          if (this.selectedCategory) {
            this.location.replaceState("/products");
            this.selectedCategory = null;
          }

          return this.productService.searchProducts(searchQuery);
        })
      )
      .subscribe((res: any) => {
        this.products = res.products;
      });
  }

  onSearchQueryInput = (event: Event): void => {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

}
