
import { observable, computed, autorun, action, extendObservable } from 'mobx';

class TodoStore {
    @observable todos = ['by milk', 'buy eggs'];
    @observable filter = '';
}
var store = window.store = new TodoStore;

autorun(() => {
    console.log(store.filter);
    console.log(store.todos[0]);
})
export default store;
