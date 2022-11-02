import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';

import { Todo } from '../../../store/todo.model';
// prettier-ignore
import { addTodo, removeTodo, loadTodo, } from '../../../store/todos/todo.action';
import { selectAllTodoS } from '../../../store/todos/todo.selector';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  public allTodoS$ = this.store.select(selectAllTodoS);
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
