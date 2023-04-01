import React from 'react';
import {createRoot} from 'react-dom/client';
import 'todomvc-app-css/index.css';
import {autoRun} from '@tylerlong/use-proxy';
import _ from 'lodash';

import store, {Todo} from './store';
import {App} from './components';

const storageKey = 'todomvc-useProxy-todos';

const data = global.localStorage.getItem(storageKey);
if (data) {
  const json = JSON.parse(data);
  store.visibility = json.visibility ?? 'all';
  store.todos = (json.todos || []).map(
    (todo: Todo) => new Todo(todo.title, todo.completed)
  );
}
const autoRunner = autoRun(
  store,
  () => global.localStorage.setItem(storageKey, JSON.stringify(store)),
  func => _.debounce(func, 100, {leading: true, trailing: true})
);
autoRunner.start();

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App store={store} />);
