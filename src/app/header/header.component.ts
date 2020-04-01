import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../services/data-storage.service';
import {interval, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  userSub: Subscription;
  public isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(
        map( authState => authState.user)
      )
      .subscribe(
      (user) => {
        this.isAuthenticated = !!user;
      }
    )
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }





}


