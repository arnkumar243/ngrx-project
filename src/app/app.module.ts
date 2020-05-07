import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './directives/dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './auth/token.interceptor.service';
import { AlertComponent } from './shared/alert/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RecipeService, ShoppingListService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
