import React from "react";
import { observer } from "mobx-react";
import TextInput from "./TextInput";

@observer
class App extends React.Component {
  handleSave = text => {
    if(text.length !== 0 ) {
      this.props.store.addTodo(text);
    }
  };

  render() {
    const todos = this.props.store.todos;
    // console.log(todos.entries())
    return (
      <div>
        <TextInput onSave={this.handleSave} />
        <ul>
          {
            todos.map(t => 
              <li>{t.text}</li>    
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
