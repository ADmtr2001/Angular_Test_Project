import {Component, Input} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {
  SelectedDishModalContentComponent
} from "../selected-dish-modal-content/selected-dish-modal-content.component";

import {IDish} from "../../../../types";

@Component({
  selector: 'app-dishes-item',
  templateUrl: './dishes-item.component.html',
  styleUrls: ['./dishes-item.component.scss']
})
export class DishesItemComponent {
  @Input() dish!: IDish;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(SelectedDishModalContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
