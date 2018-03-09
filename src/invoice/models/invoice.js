import {types} from 'mobx-state-tree'
import ItemList from './itemList';

const Invoice = types.model('Invoice', {
    currency: types.string,
    is_paid: false,
    itemList: types.optional(ItemList, {items: []}),
})
.views(self => ({
    get status() {
        return self.is_paid ? 'paid' : 'Not Paid'
    }
}))
.actions(self => ({
    markPaid() {
        self.is_paid = true;
    }
}))

export default Invoice;