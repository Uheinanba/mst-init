// https://github.com/chenxiaochun/mobx-state-tree/wiki
import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";

const randomId = () => Math.floor(Math.random() * 1000).toString(36);
// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => {
    function setName(newName) {
      self.name = newName;
    }
    function setUser(user) {
      if (user === "") {
        self.user = null;
      } else {
        self.user = user;
      }
    }

    function toggle() {
      self.done = !self.done;
    }
    return { setName, setUser, toggle };
  });

const User = types.model({
  id: types.identifier(types.string),
  name: types.optional(types.string, "")
});

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
  })
  .views(self => ({
    get pendingCount() {
      return self.todos.values().filter(todo => !todo.done).length;
    },
    get completedCount() {
      return self.todos.values().filter(todo => todo.done).length;
    },
    getTodoWhereDoneIs(done) {
      return self.todos.values().filter(todo => todo.done === done);
    }
  }))
  .actions(self => {
    function addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    }
    return { addTodo };
  });

const store = RootStore.create({
  users: {
    "1": {
      id: "1",
      name: "mweststrate"
    },
    "2": {
      id: "2",
      name: "mattiamanzati"
    },
    "3": {
      id: "3",
      name: "johndoe"
    }
  },
  todos: {
    "1": {
      name: "Eat a cake",
      done: true
    }
  }
});

// 监听新快照
onSnapshot(store, snapshot => {
  console.dir(snapshot);
});
// console.log(getSnapshot(store));

const UserPickerView = observer(props => {
  // console.log(props);
  return (
    <select
      value={props.user ? props.user.id : ""}
      onChange={e => props.onChange(e.target.value)}
    >
      <option value="">-none-</option>
      {props.store.users.values().map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
});

const TodoView = observer(props => (
  <div>
    <input
      type="checkbox"
      checked={props.todo.done}
      onChange={e => props.todo.toggle()}
    />
    <input
      type="text"
      value={props.todo.name}
      onChange={e => props.todo.setName(e.target.value)}
    />
    <UserPickerView
      user={props.todo.user}
      store={props.store}
      onChange={userId => props.todo.setUser(userId)}
    />
  </div>
));

const TodoCounterView = observer(props => (
  <div>
    {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
));

@observer
class AppView extends React.Component {
  render() {
    const props = this.props;
    // console.log(props.store.todos.values());
    return (
      <div>
        <Devtools />
        <button onClick={e => props.store.addTodo(randomId(), "New Task")}>
          Add Task
        </button>
        {props.store.todos
          .values()
          .map(todo => <TodoView todo={todo} store={props.store} />)}
        <TodoCounterView store={props.store} />
      </div>
    );
  }
}

ReactDOM.render(<AppView store={store} />, document.getElementById("root"));
