import { Component, OnInit } from '@angular/core';

import {FormControl} from "@angular/forms";
import {DishesService} from "../../../../services/dishes.service";
import {BehaviorSubject} from "rxjs";
import {IDish} from "../../../../types";

@Component({
  selector: 'app-dish-modal-content',
  templateUrl: './dish-modal-content.component.html',
  styleUrls: ['./dish-modal-content.component.scss']
})
export class DishModalContentComponent implements OnInit {
  public amount = new FormControl('1');
  public selectedDish$: BehaviorSubject<IDish | null>;

  constructor(private dishesService: DishesService) {
    this.selectedDish$ = this.dishesService.selectedDish$;
  }

  ngOnInit(): void {
  }

}
