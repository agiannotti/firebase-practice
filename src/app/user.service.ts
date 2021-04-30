import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getProductDoc(id) {
    return this.db.collection('product-collection').doc(id).valueChanges();
  }

  getProductList() {
    return this.db.collection('product-collection').snapshotChanges();
  }

  createProduct(product: Product) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('product-collection')
        .add(product)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
}
