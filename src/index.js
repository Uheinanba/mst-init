import React from 'react';
import ReactDOM from 'react-dom';
import Devtools from 'mobx-react-devtools';
import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";

const randomId = () => Math.floor(Math.random() * 1000).toString(36);
// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md
const Todo = types.model({
    // id: types.optional(types.number, 0),
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false)
}).actions(self => {
    function setName(newName) {
        self.name = newName;
    }

    function toggle() {
        self.done = !self.done;
    }
    return {setName, toggle};
})

const User = types.model({
    name: types.optional(types.string, '')
})

const RootStore = types.model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
})
.views(self => ({
    get pendingCount() {
        return self.todos.values().filter(todo => !todo.done).length;
    },
    get completedCount() {
        return self.todos.values().filter(todo => todo.done).length;
    }
}))
.actions(self => {
    function addTodo(id, name) {
        self.todos.set(id, Todo.create({name}))
    }
    return {addTodo}
});

const store = RootStore.create({
    users: {},
    todos: {
        "1": {
          name: "Eat a cake",
          done: true
        }
    }
});

console.log(getSnapshot(store))

/* console.log(getSnapshot(store));

store.addTodo(1, "Eat a cake");
store.todos.get(1).toggle();

console.log(getSnapshot(store)); */

const TodoView = observer(props => 
    <div>
        <input type="checkbox" checked={props.todo.done} onChange={e => props.todo.toggle()} />
        <input type="text" value={props.todo.name} onChange={e => props.todo.setName(e.target.value)} />
    </div>
)

const TodoCounterView = observer(props => 
    <div>
        {props.store.pendingCount} pending, {props.store.completedCount} completed
    </div>
)

@observer
class AppView extends React.Component {
    render() {
        const props = this.props;
        console.log(props.store.todos.values())
        return (
            <div>
                <Devtools />
                <button onClick={e => props.store.addTodo(randomId(), 'New Task')}>Add Task</button>
                {
                    props.store.todos.values().map(todo => <TodoView todo={todo} />)
                }
                <TodoCounterView store={props.store}/>
            </div>
        )
    }
}



ReactDOM.render(
    <AppView store={store} />,
    document.getElementById('root')
);