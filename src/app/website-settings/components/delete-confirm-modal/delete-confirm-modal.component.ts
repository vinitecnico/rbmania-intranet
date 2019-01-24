import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-delete-confirm-modal.component',
    templateUrl: 'delete-confirm-modal.component.html',
})
export class DeleteConfirmModalComponent implements OnInit {
    form: any;
    status: any;
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}

    closeDialog(item?: any): void {
        this.dialogRef.close(item);
    }
}
