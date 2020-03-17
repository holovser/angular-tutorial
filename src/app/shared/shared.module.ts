import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {DropDownDirective} from './dropdown.directive';


@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropDownDirective
  ]
})
export class SharedModule {

}
