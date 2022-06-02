import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  searchQuery = new FormControl('');
  category = new FormControl();

  categories: string[] = ['Pizza', 'Meat', 'Dessert', 'Rolls'];

  constructor() { }

  ngOnInit(): void {
  }

}
