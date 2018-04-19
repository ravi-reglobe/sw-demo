import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {UpdateAvailableEvent} from '@angular/service-worker/src/low_level';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private swUpdate: SwUpdate) {
    this.checkForUpdate();
  }

  private checkForUpdate() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {

        console.log('current version', event.current.appData['version'], ',', event.available.appData['version']);
        console.log('new version', event.available.appData['version']);

        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
      this.swUpdate.checkForUpdate().then(() => {
        console.log('this.swUpdate.checkForUpdate()');
      });
    }
  }
}
