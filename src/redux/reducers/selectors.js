import store from '../store/index.js'; // Import your Redux store

export const getPriceForStock = (stockname) => {
    const state = store.getState(); 
    const stock = state.stocks[stockname];
    if (stock && stock.price !== null) {
        const { price, open } = stock;
        return { price, open };
    }
    return { price: 1, open: 1 };
}
