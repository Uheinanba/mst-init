import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


@inject('userStore')
@observer class App extends Component {
  render() {
    const {userInfo} = this.props.userStore;
    console.log(userInfo)
    return (
      <div>
        <div onClick={this.handleFetch}>fetch</div>
        {userInfo.name ? <ul>
          <li>name: {userInfo.name}</li>
          <li>blog: {userInfo.blog}</li>
        </ul> : null}
      </div>
    );
  }
  handleFetch= () => {
    this.props.userStore.getUser();
  }
}

export default App;