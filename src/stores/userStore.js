import { observable, action } from 'mobx';

class UserStore {
    @observable userInfo = {};
    @action getUser() {
        fetch('https://api.github.com/users/a')
        .then(res => res.json())
        .then(json => {
            this.userInfo = json
        })
    }
}

export default new UserStore;