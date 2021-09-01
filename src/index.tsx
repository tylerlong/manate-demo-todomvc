import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import {autoRun} from '@tylerlong/use-proxy';
import {debounce} from 'lodash';
import {plainToClassFromExist} from 'class-transformer';

import store from './store';
import {App} from './components';

const storageKey = 'todomvc-useProxy-todos';

const data = global.localStorage.getItem(storageKey);
if (data) {
  plainToClassFromExist(store, JSON.parse(data), {
    excludeExtraneousValues: true,
  });
}
autoRun(
  store,
  debounce(
    () => global.localStorage.setItem(storageKey, JSON.stringify(store)),
    100,
    {leading: true, trailing: true}
  )
);

ReactDOM.render(<App store={store} />, document.getElementById('container'));
