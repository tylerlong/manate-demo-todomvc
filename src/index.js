import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'director/build/director'
import 'todomvc-app-css/index.css'
import { autoRun } from '@tylerlong/use-proxy'
import { debounce } from 'lodash'

import store, {emitter} from './store'
import { App } from './components'

const router = new Router({
  '/all': () => { store.visibility = 'all' },
  '/active': () => { store.visibility = 'active' },
  '/completed': () => { store.visibility = 'completed' }
})
router.init()

const savedTodos = global.localStorage.getItem('todomvc-subx-todos')
if (savedTodos) {
  store.todos = JSON.parse(savedTodos)
}
autoRun(emitter, debounce(() => global.localStorage.setItem('todomvc-subx-todos', JSON.stringify(store.todos)), 1000, {leading: true}))

ReactDOM.render(<App store={store} />, document.getElementById('container'))
