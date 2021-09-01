import {plainToClassFromExist} from 'class-transformer';

const obj = {
  todos: [{id: 'CLLUivd6QXOaoE/0qwR3Wg/0', title: '111', completed: false}],
  visibility: 'all',
};

class Store {
  visibility = 'all';
  todos: Todo[] = [];
}

class Todo {
  id: string;
  title: string;
  completed: boolean;
  constructor(id: string, title: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

const store = new Store();
console.log(JSON.stringify(store));
plainToClassFromExist(store, obj, {excludeExtraneousValues: false}); // change to true doesn't work
console.log(JSON.stringify(store));
