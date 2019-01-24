import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

// router
import { AppRoutingModule } from './app-routing.module';

// sub-module
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WebsiteSettingsModule } from './website-settings/website-settings.module';
import { LayoutModule } from '@angular/cdk/layout';

// Layout
import { LayoutComponent } from './layout/layout.component';

// Page


@NgModule({
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    SharedModule,
    LayoutModule,
    AuthenticationModule,
    WebsiteSettingsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [AngularFirestore,
  //    {
  //   provide: LOCALE_ID,
  //   useValue: 'br'
  // },
  { provide: 'LocalStorage', useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
