import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'director/build/director'
import 'todomvc-app-css/index.css'
import { autoRun } from '@tylerlong/use-proxy'
import { debounce } from 'lodash'

import store, {emitter} from './store'
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
  store.todos = JSON.parse(savedTodos)
}
autoRun(emitter, debounce(() => global.localStorage.setItem(storageKey, JSON.stringify(store.todos)), 1000, {leading: true}))

ReactDOM.render(<App store={store} />, document.getElementById('container'))
