import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class MenuService {
    private itemsCollection: AngularFirestoreCollection<any>;
    constructor(private db: AngularFirestore) {

    }

    getAll() {
        this.itemsCollection = this.db.collection('menu');

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
        return this.db.collection('menu').doc(id).ref.get();
    }
}
