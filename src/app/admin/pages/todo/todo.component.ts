import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// prettier-ignore
import { selectAllTodo,addTodo, removeTodo, loadTodo,AppState } from '@store';
import { ITodo } from '@core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public allTodoS$ = this.store.select(selectAllTodo);
  public todo = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadTodo());
  }

  addTodo() {
    this.store.dispatch(addTodo({ title: this.todo }));
    this.todo = '';
  }

  removeTodo(todo: ITodo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
