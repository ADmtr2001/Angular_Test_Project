import {Component, Input, OnInit} from '@angular/core';

import {IDish} from "../../../types";
import {MatDialog} from "@angular/material/dialog";
import {
  SelectedDishModalContentComponent
} from "../../modal/selected-dish-modal-content/selected-dish-modal-content.component";

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
