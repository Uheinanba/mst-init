import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";

const Todo = types.model({
  id: types.identifier(types.number),
  text: types.string
});

const TodoStore = types
  .model({
    todos: types.array(Todo)
  })
  .actions(self => ({
    addTodo(text) {
      const id =
        self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      self.todos.unshift({
        id,
        text
      });
    }
  }));
// .views(self => ({}));

export default TodoStore.create({
  todos: []
});
