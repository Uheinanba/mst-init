import React from 'react';
import WishListView from './WishListView';
import { observer } from "mobx-react"

class App extends React.Component {
    constructor(props) {
        super()
        this.state = { selectedUser: null }
    }

    render() {
        const { group } = this.props
        const selectedUser = group.users.get(this.state.selectedUser);
        console.log(group.users.values())

        return (
            <div className="App">
                <select onChange={this.onSelectUser}>
                    <option>- Select user -</option>
                    {group.users.values().map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button onClick={group.reload}>Reload</button>
                <button onClick={group.drawLots}>Draw lots</button>
                {selectedUser && 
                    <User user={selectedUser}/>
                }
            </div>
        )
    }

    onSelectUser = event => {
        this.setState({ selectedUser: event.target.value })
    }
}


const User = observer(({ user }) => {
    console.log(user)
    return (
        <div>
        <WishListView wishList={user.wishList} />
        <button onClick={user.getSuggestions}>Suggestions</button>
        <hr />
        <h2>{user.recipient ? user.recipient.name : ""}</h2>

        {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
    </div>
    )
})
export default observer(App);