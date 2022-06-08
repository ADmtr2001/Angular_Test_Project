import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Subject, takeUntil} from "rxjs";

import {Category} from "../../../../types/Dishes/Category";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Input() currentCategoryValue: string = '';

  @Output() categoryChange = new EventEmitter<string>();
  // FormBuilder
  public searchQuery = new FormControl('');
  public selectedCategory = new FormControl(this.currentCategoryValue);

  private destroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  public ngOnInit(): void {
    this.selectedCategory.setValue(this.currentCategoryValue);
    this.selectedCategory.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.categoryChange.emit(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
