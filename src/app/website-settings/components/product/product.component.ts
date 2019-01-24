import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Sort, MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import 'rxjs/Rx';
import * as _ from 'lodash';

// Modal
import { ProductModalComponent } from './product-modal/product-modal.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';

// services
import { ProductService } from '../../services/product.service';

declare var swal: any;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
    displayedColumns: string[] = ['name', 'img', 'status', 'featured', 'price', 'options'];
    isShowTable: Boolean = false;
    isFinally: Boolean = false;
    dataSource = new MatTableDataSource<any>();
    dataItems: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchTextRef') searchTextRef: ElementRef;
    constructor(private productService: ProductService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getItem();
    }

    getItem() {
        this.productService.getAll()
            .subscribe(response => {
                const items = _.sortBy(response, (x) => {
                    return _.lowerCase(x.name);
                });
                if (response.length > 0) {
                    this.isShowTable = true;
                } else {
                    this.isShowTable = false;
                }
                this.dataItems = items;
                this.dataSource.data = items;
                this.isFinally = true;

                setTimeout(() => {
                    Observable.fromEvent(this.searchTextRef.nativeElement, 'keyup')
                        .map((evt: any) => evt.target.value)
                        .debounceTime(800)
                        .distinctUntilChanged()
                        .subscribe((text: string) => this.applyFilter(text));
                });
            });
    }

    applyFilter(filterValue: string): void {
        let data = [];
        if (filterValue) {
            data = _.filter(this.dataItems, (x) => {
                return _.lowerCase(x.name).indexOf(filterValue) >= 0;
            });
        } else {
            data = this.dataItems;
        }
        this.dataSource.data = data;
    }

    sortData(sort: Sort) {
        const data = this.dataSource.data;
        const array = _.sortBy(data, (x) => {
            if (_.isObject(x)) {
                return _.lowerCase(x[sort.active].name);
            }
            return _.lowerCase(x[sort.active]);
        });

        if (sort.direction === 'asc') {
            this.dataSource.data = _.orderBy(array, [sort.active], ['asc']);
        } else {
            this.dataSource.data = _.orderBy(array, [sort.active], ['desc']);
        }
    }

    customDataSort = (data: any, sortHeaderId: string): any => {
        if (sortHeaderId === 'id' || typeof data[sortHeaderId] === 'number') {
            return data[sortHeaderId];
        }
    }

    openModalDelete(item) {
        item.title = 'Deseja realmente excluir tarefa?';
        const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
            width: '60%',
            data: item
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result && result.id) {
                    this.delete(result);
                }
            });
    }

    delete(item) {
        this.productService.delete(item.id)
            .catch(error => {
                swal({
                    text: error,
                    type: 'error'
                });
            })
            .then(() => {
                swal({
                    text: `Produto deletado (${item.id}) in (${item.name})!`,
                    type: 'success'
                }).then(() => { this.getItem(); });
            });
    }

    openModal(item?) {
        if (!item) {
            item = {};
        }
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: '60%',
            data: item
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
