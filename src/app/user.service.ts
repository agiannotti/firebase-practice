import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

const baseUrl = `${environment.apiUrl}/users`;
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

  getProductId() {
    // this.db
    //   .collection<any>('product-collection')
    //   .snapshotChanges()
    //   .pipe(
    //     map((products) => {
    //       return products.map((e) => {
    //         const data = e.payload.doc.data();
    //         const id = e.payload.doc.id;
    //         console.log('id', id, 'data', data);
    //         return { id, data };
    //       });
    //     })
    //   )
    //   .subscribe();
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
  getById(id: string) {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  deleteProduct(product) {
    return this.db.collection('product-collection').doc(product.id).delete();
  }

  updateProduct(product: Product, id) {
    return this.db.collection('product-collection').doc(id).update({
      name: product.name,
      description: product.description,
      content: product.content,
    });
  }
}
