import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';

import { Todo } from '../../../core/models/todo.model';
// prettier-ignore
import { addTodo, removeTodo, loadTodo, } from '../../../store/todo/todo.action';
import { selectAllTodo } from '../../../store/todo/todo.selector';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  public allTodoS$ = this.store.select(selectAllTodo);
  public todo = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadTodo());
  }

  addTodo() {
    this.store.dispatch(addTodo({ content: this.todo }));
    this.todo = '';
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
