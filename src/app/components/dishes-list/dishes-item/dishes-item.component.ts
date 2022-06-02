import {Component, Input, OnInit} from '@angular/core';

import {IDish} from "../../../types";

@Component({
  selector: 'app-dishes-item',
  templateUrl: './dishes-item.component.html',
  styleUrls: ['./dishes-item.component.scss']
})
export class DishesItemComponent implements OnInit {
  @Input() dish!: IDish;

  constructor() { }

  ngOnInit(): void {
  }
}
