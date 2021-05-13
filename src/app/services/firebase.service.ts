import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //FirestoreColection
  private productsCollection: AngularFirestoreCollection<Product>

  constructor(
    private angularFirestore: AngularFirestore
  ) {
    this.productsCollection = this.angularFirestore.collection<Product>('Products');
   }

   //Método de consullta All
   getAllProducts(){
     return this.productsCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, ...data}
         })
       })
     );
   }

   //Método de cadastro de produtos
   addProducts(product:Product){
    return this.productsCollection.add(product);
   }

   //Método para deletar
   delProduct(id: string){
     return this.productsCollection.doc(id).delete();
   }

   //Método para capturar um unico ID
   getProduct(id: string){
     return this.productsCollection.doc<Product>(id).valueChanges();
   }

   upProduct(id: string, product: Product){
     return this.productsCollection.doc(id).update(product);
   }
}
