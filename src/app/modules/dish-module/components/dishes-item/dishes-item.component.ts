import {Component, Input} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {
  DishModalContentComponent
} from "../dish-modal-content/dish-modal-content.component";

import {IDish} from "../../../../types";
import {DishesService} from "../../../../services/dishes.service";

@Component({
  selector: 'app-dishes-item',
  templateUrl: './dishes-item.component.html',
  styleUrls: ['./dishes-item.component.scss']
})
export class DishesItemComponent {
  @Input() dish!: IDish;

  constructor(private dialog: MatDialog, private dishesService: DishesService) {
  }

  public openDialog(): void {
    this.dishesService.setSelectedDish(this.dish)

    const dialogRef = this.dialog.open(DishModalContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
