import { Injectable } from '@angular/core';
import { Todo } from '../todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  async getTodo(): Promise<Todo[]> {
    return [
      {
        id: '1',
        content: 'Buy Milk',
        completed: false,
      },
      {
        id: '2',
        content: 'Buy Bread',
        completed: false,
      },
      {
        id: '3',
        content: 'Buy Eggs',
        completed: false,
      },
    ];
  }

  async saveTodo(todoS: Todo[]) {
    return {
      id: Date.now().toString(),
      content: todoS,
      completed: false,
    };
  }
}
