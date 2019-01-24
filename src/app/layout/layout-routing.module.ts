import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/app/home', pathMatch: 'full' }
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
