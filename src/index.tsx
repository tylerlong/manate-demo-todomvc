import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import {autoRun} from '@tylerlong/use-proxy';
import _ from 'lodash';
import {plainToClassFromExist} from 'class-transformer';

import store from './store';
import {App} from './components';

const storageKey = 'todomvc-useProxy-todos';

const data = global.localStorage.getItem(storageKey);
if (data) {
  plainToClassFromExist(store, JSON.parse(data), {
    excludeExtraneousValues: false, // todo: this should be true, but true will not populate todos
  });
}
const autoRunner = autoRun(
  store,
  () => {
    global.localStorage.setItem(storageKey, JSON.stringify(store));
  },
  (func: () => void) => _.debounce(func, 100, {leading: true, trailing: true})
);
autoRunner.start();

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
