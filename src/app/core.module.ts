import {NgModule} from '@angular/core';
import {RecipeService} from './services/recipe.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {LoggingService} from './logging.service';

@NgModule({
  providers: [
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
  exports: []
})
export class CoreModule {

}
