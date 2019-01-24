import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authentication/components/login/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

export const AuthenticationRoutingModule = RouterModule.forChild(routes);
