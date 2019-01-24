import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ProductService {
    private itemsCollection: AngularFirestoreCollection<any>;
    constructor(private db: AngularFirestore) {

    }

    getAll() {
        this.itemsCollection = this.db.collection('products');

        return this.itemsCollection.snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as any;
                        data.id = a.payload.doc.id;
                        return data;
                    })
                )
            );
    }

    getProductBySubMenuList(subMenu) {
        this.itemsCollection = this.db.collection('products', ref =>
            ref.where('subCategory', '==', subMenu)
                .where('status', '==', true));

        return this.itemsCollection.snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as any;
                        data.id = a.payload.doc.id;
                        return data;
                    })
                )
            );
    }

    search(search) {
        this.itemsCollection = this.db.collection('products', ref =>
            ref.where('status', '==', true));

        return this.itemsCollection.snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as any;
                        data.id = a.payload.doc.id;
                        return data;
                    })
                )
            );
    }

    getById(id) {
        return this.db.collection('products').doc(id).ref.get();
    }

    delete(id) {
        return this.db.doc(`products/${id}`).delete();
    }

    createOrUpdate(data) {
        if (data && data.id) {
            return this.db.doc(`products/${data.id}`).update(data);
        } else {
            data = _.omit(data, ['id']);
            return this.db.collection('products').add(data);
        }
    }
}
