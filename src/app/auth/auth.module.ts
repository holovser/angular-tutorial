import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {Route, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Route[] = [
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class AuthModule {}
