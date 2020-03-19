import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';
import {Route, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Route[] = [
  { path: '', component: AuthComponent}
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
