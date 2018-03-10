import { types, getParent } from "mobx-state-tree";
import User from "./user";

const Book = types
  .model("book", {
    num: types.number,
    pro: types.string,
    user: types.maybe(types.reference(User))
    // types.map(User)
  })
  .views(self => ({
    get msg() {
      return `num: ${this.num}, pro: ${this.pro}`;
    }
  }))
  .actions(self => ({
    addBookUser(user) {
      self.user = user;
    }
  }));

export default Book;
