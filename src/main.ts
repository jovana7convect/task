import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

/**
 * Check the new setup for the version 17, if it suits your application more
 * I still prefer working with modules and for more complex app, it is a better approach
 * I do use standalone for shared/dummy components
 */
// bootstrapApplication(AppComponent, {
//   providers: [
//     YOUR_ROUTES_FROM_FILE,
//     provideHttpClient(),
//     provideStore({app: appReducer}),
//     provideEffects(),
//     provideRouterStore(),
//     provideAnimations()
//   ]
// });
