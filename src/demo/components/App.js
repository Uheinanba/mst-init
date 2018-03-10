import React, { Component } from "react";
import { observer } from "mobx-react";

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <p>book</p>
        <button onClick={this.addUser}>addUser</button>
        <button onClick={this.addBookUser}>addBookUser</button>
      </div>
    );
  }
  addUser = () => {
    this.props.store.user.addUser("yuank", 23);
  };
  addBookUser = () => {
    this.props.store.book.addBookUser(this.props.store.user);
  };
}

export default observer(App);
