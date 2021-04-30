import { Product } from './../product.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  products: Product[];

  constructor(private userService: UserService) {}
  // ngOnInit() {
  //   this.userService.getProductList().subscribe((res) => {
  //     this.products = res.map((e) => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...e.payload.doc.data(),
  //       } as Product;
  //     });
  //   });
  // }

  ngOnInit() {
    this.userService
      .getProductList()
      .pipe(
        map((actions) => {
          return actions.map((e) => {
            const data = e.payload.doc.data();
            const id = e.payload.doc.id;
            console.log('id', id, 'data', data);
            return { id, data };
          });
        })
      )
      .subscribe();
  }
  removeProduct = (product) => this.userService.deleteProduct(product);
}
