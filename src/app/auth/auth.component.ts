import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  userDataForm: FormGroup;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;


  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.storeSub = this.store.select('auth').subscribe( authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

      if ( this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.closeSub ) {
      this.closeSub.unsubscribe();
    }
    if ( this.storeSub ) {
      this.storeSub.unsubscribe();
    }
  }


  onSubmit() {
    if (!this.userDataForm.valid) {
      return;
    }

    const email = this.userDataForm.value.email;
    const password = this.userDataForm.value.password;


    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({email: email, password: password})
      );
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}) )
    }

    // authObs.subscribe(
    //   response => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //
    //   }
    // );

    this.userDataForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }


}
