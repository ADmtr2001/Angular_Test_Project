import {Component, Input} from '@angular/core';
import {DishModalContentComponent} from "../../../../shared/dish-modal-content/dish-modal-content.component";

import {DishesService} from "../../../../services/dishes.service";

import {Dish} from "../../../../types/Dishes/Dish.interface";
import {Store} from "@ngrx/store";
import {setSelectedDish} from "../../../../store/dishes/dishes.actions";

@Component({
  selector: 'app-dishes-item',
  templateUrl: './dishes-item.component.html',
  styleUrls: ['./dishes-item.component.scss']
})
export class DishesItemComponent {
  @Input() dish!: Dish;

  constructor(private dishesService: DishesService, private store: Store) {
  }

  public openDialog(): void {
    this.store.dispatch(setSelectedDish({dish: this.dish}));
    this.dishesService.openDishDialog(DishModalContentComponent);
  }
}
