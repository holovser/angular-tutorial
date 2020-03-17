import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

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

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;


  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy(): void {
    if ( this.closeSub ) {
      this.closeSub.unsubscribe();
    }
  }


  onSubmit() {
    if (!this.userDataForm.valid) {
      return;
    }

    const email = this.userDataForm.value.email;
    const password = this.userDataForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;

      }
    );

    this.userDataForm.reset();
  }

  onHandleError() {
    this.error = null;
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
