import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { SpaElementButtonComponent } from './spa-element-button/spa-element-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaElementButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [SpaElementButtonComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(SpaElementButtonComponent, { injector });
    customElements.define('app-spa-element-button', customButton);
  }

  ngDoBootstrap() {}
 }
