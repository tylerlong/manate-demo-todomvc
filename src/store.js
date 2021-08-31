import { v4 as uuid } from 'uuid'
import * as R from 'ramda'
import { useProxy } from '@tylerlong/use-proxy'

export class Todo {
  constructor(title, completed) {
    this.id = uuid();
    this.title = title;
    this.completed = completed;
  }

  edit () {
    this.cache = this.title
  }

  doneEdit () {
    this.title = this.title.trim()
    if (this.title === '') {
      store.remove(this)
    }
    delete this.cache
  }

  cancelEdit () {
    this.title = this.cache
    delete this.cache
  }
}

const store = useProxy({
  todos: [],
  visibility: 'all',
  get visibleTodos () {
    if (this.visibility === 'all') {
      return this.todos
    } else if (this.visibility === 'active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }
  },
  get areAllDone () {
    return R.all(todo => todo.completed, this.todos)
  },
  get leftCount () {
    return this.todos.filter(todo => !todo.completed).length
  },
  get doneCount () {
    return this.todos.filter(todo => todo.completed).length
  },
  toggleAll () {
    if (this.areAllDone) {
      R.forEach(todo => { todo.completed = false }, this.todos)
    } else {
      R.forEach(todo => { todo.completed = true }, this.todos)
    }
  },
  add (title) {
    title = title.trim()
    if (title !== '') {
      this.todos.push(new Todo(title, false))
    }
  },
  remove (todo) {
    const index = R.findIndex(t => t.id === todo.id, this.todos)
    this.todos.splice(index, 1)
  },
  clearCompleted () {
    this.todos = this.todos.filter(todo => !todo.completed)
  }
})

export default store
