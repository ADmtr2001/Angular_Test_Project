import { Component, OnInit } from '@angular/core';

import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-selected-dish-modal-content',
  templateUrl: './selected-dish-modal-content.component.html',
  styleUrls: ['./selected-dish-modal-content.component.scss']
})
export class SelectedDishModalContentComponent implements OnInit {
  amount = new FormControl('1');

  constructor() { }

  ngOnInit(): void {
  }

}
