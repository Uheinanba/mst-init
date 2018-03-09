import {types} from 'mobx-state-tree'
import ItemList from './itemList';

const Box = types.model("Box", {
    width: types.number,
    height: types.number
})
const Square = types.model("Square", {
    width: types.number
})

// todo
/* const Plane = types.union(Square, Box)
const DispatchPlane = types.union(
    snapshot => (snapshot && "height" in snapshot ? Box : Square),
    Box,
    Square
)
 */
const Invoice = types.model('Invoice', {
    // plane: types.optional(Plane, { width: 3 }),
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