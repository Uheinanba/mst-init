import React from "react";

class App extends React.Component {
  state = {
    text: ""
  };
  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.setState({ text: "" });
      this.props.onSave(text);
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
