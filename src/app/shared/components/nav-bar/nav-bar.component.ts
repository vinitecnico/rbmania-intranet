import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
    activeUrl: string;
    isCollapsed = false;
    public currentLang: string;

    constructor() { }
}
