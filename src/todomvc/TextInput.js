import React from "react";

class App extends React.Component {
  state = {
    text: ""
  };
  handleChange = e => {
    this.this.setState({
      text: e.target.value
    });
  };
  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      this.setState({ text: "" });
    }
  };
  render() {
    return (
      <div>
        <input onKeyDown={this.handleSubmit} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
