import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';

import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_DETAILS, SEARCH_PRODUCT } from '../url-paths';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private restService: HttpClient, private tokenService: TokenService) { }

  getAllProducts = () =>
    this.restService.get(GET_ALL_PRODUCTS);

  getAllCategories = () =>
    this.restService.get(GET_ALL_CATEGORIES);

  getProductsByCategory = (category: string) =>
    this.restService.get(`${GET_PRODUCTS_BY_CATEGORY}/${category}`);

  getProductDetails = (productId: string) =>
    this.restService.get(`${GET_PRODUCT_DETAILS}/${productId}`);

  searchProducts = (searchText: string) =>
    this.restService.get(`${SEARCH_PRODUCT}${searchText}`);
}
