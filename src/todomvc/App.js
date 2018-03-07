import React from "react";
import TextInput from "./TextInput";

class App extends React.Component {
  handleSave = text => {};
  render() {
    const todos = this.props.store.todos;
    return (
      <div>
        <TextInput onSave={this.handleSave} />
      </div>
    );
  }
}

export default App;
