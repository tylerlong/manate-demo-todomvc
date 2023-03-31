/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-extraneous-import */
import hyperid from 'hyperid';
import _ from 'lodash';
import {manage} from 'manate';

const uuid = hyperid();

export class Todo {
  id: string;
  title: string;
  completed: boolean;
  cache?: string;

  constructor(title: string, completed: boolean) {
    this.id = uuid();
    this.title = title;
    this.completed = completed;
  }

  edit() {
    this.cache = this.title;
  }

  doneEdit() {
    this.title = this.title.trim();
    if (this.title === '') {
      this.remove();
    }
    delete this.cache;
  }

  cancelEdit() {
    this.title = this.cache!;
    delete this.cache;
  }

  remove() {
    store.todos = store.todos.filter(todo => todo.id !== this.id);
  }
}

export class Store {
  todos: Todo[] = [];
  visibility = 'all';

  get visibleTodos() {
    if (this.visibility === 'all') {
      return this.todos;
    } else if (this.visibility === 'active') {
      return this.todos.filter((todo: Todo) => !todo.completed);
    } else if (this.visibility === 'completed') {
      return this.todos.filter((todo: Todo) => todo.completed);
    }
    throw new Error(`Unknown visibility "${this.visibility}"`);
  }

  get areAllDone() {
    return _.every(this.todos, (todo: Todo) => todo.completed);
  }

  get leftCount() {
    return this.todos.filter((todo: Todo) => !todo.completed).length;
  }

  get doneCount() {
    return this.todos.filter((todo: Todo) => todo.completed).length;
  }

  toggleAll() {
    if (this.areAllDone) {
      _.forEach(this.todos, (todo: Todo) => {
        todo.completed = false;
      });
    } else {
      _.forEach(this.todos, (todo: Todo) => {
        todo.completed = true;
      });
    }
  }

  add(title: string) {
    title = title.trim();
    if (title !== '') {
      this.todos.push(new Todo(title, false));
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo: Todo) => !todo.completed);
  }
}

const store = manage(new Store());
export default store;
