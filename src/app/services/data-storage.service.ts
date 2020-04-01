import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from './recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      "https://ng-course-recipe-book-e2a4b.firebaseio.com/recipes.json",
      recipes
    )
      .subscribe(
        response => {
          // console.log(response);
        }
      );
  }

  fetchRecipes() {

    return this.store.select('auth').pipe(
      map( authState => authState.user),
      take(1),
      exhaustMap( user => {
        console.log(user);
        return this.http.get<Recipe[]>("https://ng-course-recipe-book-e2a4b.firebaseio.com/recipes.json")
      }),
      map(
        recipes => {
          return recipes.map(recipe =>  {
            recipe.ingredients = [];
            return recipe;
          } );
        }
      ),
      tap( recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // return this.http.get<Recipe[]>("https://ng-course-recipe-book-e2a4b.firebaseio.com/recipes.json")
    //   .pipe(
    //     map(
    //       recipes => {
    //         return recipes.map(recipe =>  {
    //           recipe.ingredients = [];
    //           return recipe;
    //         } );
    //       }
    //     ),
    //     tap( recipes => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   )
  }





}
