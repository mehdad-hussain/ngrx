import { Injectable } from '@angular/core';
import { ITodo } from '@core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  async getTodo(): Promise<ITodo[]> {
    return [
      {
        id: '1',
        title: 'Buy Milk',
        completed: false,
      },
      {
        id: '2',
        title: 'Buy Bread',
        completed: false,
      },
      {
        id: '3',
        title: 'Buy Eggs',
        completed: false,
      },
    ];
  }

  async saveTodo(todo: ITodo[]) {
    return {
      id: Date.now().toString(),
      title: todo,
      completed: false,
    };
  }
}
