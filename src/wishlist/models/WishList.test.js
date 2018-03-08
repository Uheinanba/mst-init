import { WishListItem } from './WishList'

it('can create a instance of a model', () => {
    const item = WishListItem.model({
        name: 'yuankun',
        price: 28.73,
    });

    expect(item.price).toBe(28.73)
})