import React from 'react';
import {Component} from 'manate/react';
import classNames from 'classnames';
import pluralize from 'pluralize';

/* DEV-START */
import {Subject} from 'rxjs';
import {Store, Todo} from './store';
const render$ = new Subject();
(global as any).render$ = render$;
render$.subscribe(name => console.log(`render component <${name} />`));
/* DEV-END */

export class App extends Component<{store: Store}> {
  name = 'App';

  render() {
    /* DEV-START */
    render$.next(this.name);
    /* DEV-END */
    const store = this.props.store;
    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              autoFocus
              autoComplete="off"
              placeholder="What needs to be done?"
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  store.add((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </header>
          <Body store={store} />
          <Footer store={store} />
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Written by <a href="https://github.com/tylerlong">Tyler Long</a>
          </p>
          <p>
            <a href="https://github.com/tylerlong/manate-demo-todomvc">
              Source code
            </a>{' '}
            available
          </p>
        </footer>
      </>
    );
  }
}

export class Body extends Component<{store: Store}> {
  name = 'Body';

  render() {
    /* DEV-START */
    render$.next(this.name);
    /* DEV-END */
    const store = this.props.store;
    if (store.todos.length === 0) {
      return '';
    }
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={store.areAllDone}
          onChange={() => store.toggleAll()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {store.visibleTodos.map(todo => (
            <TodoItem store={store} todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>
    );
  }
}

export class TodoItem extends Component<{store: Store; todo: Todo}> {
  private editField: React.RefObject<HTMLInputElement> = React.createRef();
  name = 'TodoItem';

  render() {
    /* DEV-START */
    render$.next(this.name);
    /* DEV-END */
    const {todo} = this.props;
    return (
      <li
        className={classNames('todo', {
          completed: todo.completed,
          editing: todo.cache,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={e => {
              todo.completed = e.target.checked;
            }}
          />
          <label
            onDoubleClick={() => {
              todo.edit();
              setTimeout(() => this.editField.current!.focus(), 10);
            }}
          >
            {todo.title}
          </label>
          <button className="destroy" onClick={() => todo.remove()} />
        </div>
        <input
          ref={this.editField}
          className="edit"
          type="text"
          value={todo.title}
          onChange={e => {
            todo.title = e.target.value;
          }}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              todo.doneEdit();
            } else if (e.key === 'Escape') {
              todo.cancelEdit();
            }
          }}
          onBlur={() => todo.doneEdit()}
        />
      </li>
    );
  }
}

export class Footer extends Component<{store: Store}> {
  name = 'Footer';

  render() {
    /* DEV-START */
    render$.next(this.name);
    /* DEV-END */
    const store = this.props.store;
    if (store.todos.length === 0) {
      return '';
    }
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{pluralize('item', store.leftCount, true)}</strong> left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                store.visibility = 'all';
              }}
              className={classNames({selected: store.visibility === 'all'})}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                store.visibility = 'active';
              }}
              className={classNames({selected: store.visibility === 'active'})}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                store.visibility = 'completed';
              }}
              className={classNames({
                selected: store.visibility === 'completed',
              })}
            >
              Completed
            </a>
          </li>
        </ul>
        {store.doneCount > 0 ? (
          <button
            className="clear-completed"
            onClick={() => store.clearCompleted()}
          >
            Clear completed
          </button>
        ) : (
          ''
        )}
      </footer>
    );
  }
}
