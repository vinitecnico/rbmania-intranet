import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule
} from '@angular/material';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { ProductModalComponent } from './components/product/product-modal/product-modal.component';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';

// Services
import { ProductService } from './services/product.service';
import { MenuService } from './services/menu.service';

// Router
import { WebsiteRoutingModule } from './website-routing.module';

// sub-menu
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        WebsiteRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent,
        ProductComponent,
        ProductModalComponent,
        DeleteConfirmModalComponent
    ],
    entryComponents: [
        ProductModalComponent, DeleteConfirmModalComponent
    ],
    providers: [ProductService, MenuService]
})
export class WebsiteSettingsModule { }
