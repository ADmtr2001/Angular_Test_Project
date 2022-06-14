import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {FormControl} from "@angular/forms";

import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-section-select',
  templateUrl: './section-select.component.html',
  styleUrls: ['./section-select.component.scss']
})
export class SectionSelectComponent implements OnInit, OnDestroy {
  @Output() sectionSelect: EventEmitter<string> = new EventEmitter<string>();

  public selectedSection: FormControl = new FormControl('');

  private destroy$: Subject<void> = new Subject<void>()

  constructor() {
  }

  public ngOnInit(): void {
    this.selectedSection.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.sectionSelect.emit(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
