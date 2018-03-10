import { types, getParent } from "mobx-state-tree";

const User = types
  .model({
    id: types.identifier(),
    name: types.string,
    age: types.number
  })
  .actions(self => ({
    addUser(name, age) {
      console.log(3434);
      self.name = name;
      self.age = age;
    }
  }));

export default User;
