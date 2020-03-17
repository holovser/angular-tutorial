import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DropDownDirective} from './shared/dropdown.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeService} from './services/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceholderDirective} from './shared/placeholder/placeholder.directive';
import {RecipesModule} from './recipes/recipes.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
