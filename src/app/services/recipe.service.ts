import {Recipe} from '../recipes/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import { Injectable } from "@angular/core";
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe( 1, 'Baked chicken', 'Very tasty chicken',
  //     'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(2, 'Big Fat Burger', 'Fat burger',
  //     'https://image.cnbcfm.com/api/v1/image/106322586-1578324793503bk_rebel_b_whopper_kv_0002_lightgreen.jpg?v=1578325001&w=1400&h=950',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];


  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(
      (rec) => {
        return rec.id === id;
      }
    );
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    for (let rec of this.recipes) {
      if ( rec.id === id ) {
        rec.name = newRecipe.name;
        rec.description = newRecipe.description;
        rec.imagePath = newRecipe.imagePath;
        rec.ingredients = newRecipe.ingredients;
        break;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    for ( let i = 0; i < this.recipes.length; i++ ) {
      if ( this.recipes[i].id === id ) {
        this.recipes.splice(i, 1);
        break;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
