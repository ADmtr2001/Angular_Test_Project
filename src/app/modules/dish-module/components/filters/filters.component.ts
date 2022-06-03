import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public searchQuery = new FormControl('');
  public category = new FormControl();

  public categories: string[] = ['Pizza', 'Meat', 'Dessert', 'Rolls'];

  constructor() { }

  ngOnInit(): void {
  }

}
