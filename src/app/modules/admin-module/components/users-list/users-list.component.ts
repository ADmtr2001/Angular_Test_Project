import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {allUsersErrorSelector, allUsersLoadingSelector, allUsersSelector} from "../../../../store/user/user.reducer";
import {fetchUsers} from "../../../../store/user/user.actions";

import {User} from "../../../../types/Auth/User.interface";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<ReadonlyArray<User>> = this.store.select(allUsersSelector);
  public isUsersLoading$: Observable<boolean> = this.store.select(allUsersLoadingSelector);
  public usersError$: Observable<string> = this.store.select(allUsersErrorSelector);

  public displayedColumns: string[] = ['position', 'name', 'email', 'id', 'role'];

  constructor(
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(fetchUsers());
  }
}
