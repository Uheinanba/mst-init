import { types, getParent } from "mobx-state-tree";
import User from "./user";
import Book from "./book";

const Index = types.model("view", {
  book: types.optional(Book, {
    num: 0,
    pro: ""
  }),
  user: types.optional(User, {
    id: "sn-34341",
    name: "",
    age: 0
  })
});

export default Index;
