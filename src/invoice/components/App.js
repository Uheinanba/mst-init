import React, {Component} from "react";
import Item from './Item';
import { observer } from 'mobx-react'

class App extends Component {
    render() {
        const {invoice} = this.props;
        return (
            <div className="App">
                <h1>{invoice.status}</h1>
                <button onClick={invoice.markPaid}>Pay</button>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    invoice.itemList.add({
                        name: this.nameInput.value,
                        quantity: parseInt(this.quantityInput.value, 10),
                        price: parseFloat(this.priceInput.value),
                    });
                    e.target.reset();
                    }}>
                    <label htmlFor="name">
                        name
                        <input type="text" ref={input => (this.nameInput = input)} id='name'/>
                    </label>

                    <label htmlFor="quantity">
                        quantity
                        <input type="number" ref={input => (this.quantityInput = input)} id='quantity'/>
                    </label>

                    <label htmlFor="price">
                        price
                        <input type="number" ref={input => (this.priceInput = input)} id='price'/>
                    </label>

                    <button type="submit">Add</button>
                </form>

                <h2>
                    Total is ${invoice.itemList.total.toFixed(2)}
                </h2>
                <ul>
                    {
                        invoice.itemList.items.map((item, i) => 
                            <Item item={item} key={i}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default observer(App);