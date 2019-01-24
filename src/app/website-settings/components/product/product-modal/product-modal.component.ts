import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, Sort, MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import * as moment from 'moment';
import * as _ from 'lodash';

// service
import { ProductService } from 'src/app/website-settings/services/product.service';
import { MenuService } from 'src/app/website-settings/services/menu.service';

declare var swal: any;

@Component({
    selector: 'app-product-modal',
    templateUrl: 'product-modal.component.html',
})
export class ProductModalComponent implements OnInit {
    form: any;
    formImg: any;
    status: any;
    item: any;
    categories: any;
    subCategories: any;
    isShowTable: Boolean = false;
    isFinally: Boolean = false;
    displayedColumns: string[] = ['big', 'medium', 'small', 'options'];
    dataSource = new MatTableDataSource<any>();
    indexPhoto: number;
    imgItem: string;
    constructor(
        public dialogRef: MatDialogRef<ProductModalComponent>,
        private formBuilder: FormBuilder,
        private db: AngularFirestore,
        private productService: ProductService,
        private menuService: MenuService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.form = formBuilder.group({
            id: null,
            name: [null, Validators.required],
            status: ['true', Validators.required],
            featured: ['false'],
            category: [null, Validators.required],
            subCategory: null,
            description: null,
            packageContent: null,
            quantity: null,
            oldPrice: null,
            price: [null, Validators.required],
            reference: null,
            img: null,
            photos: null
        });
        this.formImg = formBuilder.group({
            big: [null, Validators.required],
            medium: [null, Validators.required],
            small: [null, Validators.required]
        });
    }

    ngOnInit() {
        this.menuService.getAll()
            .subscribe(response => {
                this.categories = response;
                if (this.data && this.data.id) {
                    this.productService.getById(this.data.id)
                        .then(resp => {
                            if (resp.exists) {
                                this.item = resp.data();
                                this.item.id = this.data.id;
                                if (this.item.oldPrice) {
                                    this.item.oldPrice = this.item.oldPrice / 100;
                                }
                                if (this.item.price) {
                                    this.item.price = this.item.price / 100;
                                }

                                if (this.item.photos.length > 0) {
                                    this.isShowTable = true;
                                    this.dataSource.data = this.item.photos;
                                } else {
                                    this.isShowTable = false;
                                }
                                this.isFinally = true;
                                this.setSubCategory(this.item.category);
                                this.item.status = this.item.status.toString();
                                this.item.featured = this.item.featured.toString();
                                this.setValueData(this.item);
                            }
                        });
                } else {
                    this.isShowTable = false;
                    this.isFinally = true;
                }
            });
    }

    setValueData(request): void {
        const data = {
            id: request.id,
            name: request.name,
            status: request.status,
            featured: request.featured,
            category: request.category,
            subCategory: request.subCategory,
            description: request.description,
            packageContent: request.packageContent,
            quantity: request.quantity,
            oldPrice: request.oldPrice,
            price: request.price,
            reference: request.reference,
            img: request.img,
            photos: request.photos
        };

        this.form.setValue(data);
    }

    setSubCategory(id) {
        const item = _.find(this.categories, (x) => {
            return x.id === id;
        });

        this.subCategories = item.subMenu;
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    createOrUpdate() {
        if (!this.form.valid) {
            return;
        }

        const data = this.form.value;
        if (data.oldPrice) {
            data.oldPrice = data.oldPrice * 100;
        }

        if (data.price) {
            data.price = data.price * 100;
        }

        data.status = data.status === 'true';
        data.featured = data.featured === 'true';
        data.photos = this.dataSource.data;

        this.productService.createOrUpdate(data)
            .catch(error => {
                swal({
                    text: error,
                    type: 'error'
                });
            })
            .then(() => {
                swal({
                    text: `Produto Salvo com sucesso!`,
                    type: 'success'
                }).then(() => { this.closeDialog(); });
            });
    }

    setEditPhoto(item, index) {
        this.indexPhoto = index;
        this.formImg.setValue(item);
    }

    createOrEditPhoto() {
        if (!this.formImg.valid) {
            return;
        }

        const data = this.dataSource.data;

        if (this.indexPhoto != null && this.indexPhoto >= 0) {
            data[this.indexPhoto] = this.formImg.value;
            this.indexPhoto = null;
        } else {
            data.push(this.formImg.value);
        }
        this.dataSource.data = data;
        this.formImg.setValue({ big: null, medium: null, small: null });
        this.isShowTable = true;
    }

    removePhoto(index) {
        const data: any = this.dataSource.data;
        data.pop(index);
        this.dataSource.data = data;
        if (this.item.photos.length <= 0) {
            this.isShowTable = false;
        }
    }
}
