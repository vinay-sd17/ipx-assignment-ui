import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/common.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html'
})
export class ProductViewComponent implements OnInit {
  @Input() product: IProduct;
  @Input() detailsView: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateCart = (event: Event, productId: number) => {
    event.preventDefault();

    console.log(productId);

    // Store will be initiated here to handle cart addition
  }

}
