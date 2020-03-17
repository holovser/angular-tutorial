import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  toShoppingList(inredients: Ingredient[]) {
    for ( const ingr of inredients ) {
      this.shoppingListService.addIngredient(ingr);
    }
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

}
