import {types, destroy} from 'mobx-state-tree'
import Item from './item'

const ItemList = types.model('ItemList', {
    items: types.array(Item)
})
.actions(self => ({
    add(item) {
        self.items.push(item);
    },
    remove(item) {
        destroy(item)
        // self.items.splice(self.items.indexOf(item), 1);
    }
}))
.views(self=>({
    get total() {
        return self.items.reduce((sum, item) => sum + item.total, 0);
    }
}))

export default ItemList;
