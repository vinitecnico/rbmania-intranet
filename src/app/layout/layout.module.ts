import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    LayoutRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  declarations: []
})

export class LayoutModule { }
