import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../services/data-storage.service';
import {interval, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  userSub: Subscription;
  private isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(
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


