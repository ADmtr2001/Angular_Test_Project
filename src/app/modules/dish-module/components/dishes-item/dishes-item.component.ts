import {Component, Input} from '@angular/core';
import {DishModalContentComponent} from "../../../../shared/dish-modal-content/dish-modal-content.component";

import {DishesService} from "../../../../services/dishes.service";

import {Dish} from "../../../../types/Dish";

@Component({
  selector: 'app-dishes-item',
  templateUrl: './dishes-item.component.html',
  styleUrls: ['./dishes-item.component.scss']
})
export class DishesItemComponent {
  @Input() dish!: Dish;

  // Это же все равно не считается dump component из-за сервиса?
  // Нужно было бы передать ивентов вверх?
  constructor(private dishesService: DishesService) {
  }

  public openDialog(): void {
    this.dishesService.openDishDialog(DishModalContentComponent, this.dish);
  }
}
