import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'director/build/director'
import 'todomvc-app-css/index.css'
import { autoRun } from '@tylerlong/use-proxy'
import { debounce } from 'lodash'

import store, {Todo} from './store'
import { App } from './components'

const storageKey = 'todomvc-useProxy-todos'

const router = new Router({
  '/all': () => { store.visibility = 'all' },
  '/active': () => { store.visibility = 'active' },
  '/completed': () => { store.visibility = 'completed' }
})
router.init()

const savedTodos = global.localStorage.getItem(storageKey)
if (savedTodos) {
  store.todos = JSON.parse(savedTodos).map(todo => new Todo(todo.title, todo.completed))
}
autoRun(store, debounce(() => global.localStorage.setItem(storageKey, JSON.stringify(store.todos)), 100, {leading: true, trailing: true}))

ReactDOM.render(<App store={store} />, document.getElementById('container'))
