import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import {
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

// Components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// Services

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        MatSortModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgbCollapseModule,
        CollapseModule.forRoot()
    ],
    declarations: [
        NavBarComponent
    ],
    exports: [
        NavBarComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
