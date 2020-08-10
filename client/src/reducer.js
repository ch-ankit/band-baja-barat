export const initialState = {
    basket: [
        // {
        //     id: "3254354345",
        //     title: "New Apple iPad Pro (12.9 inch, Wi-Fi, 128GB)- Silver Color",
        //     price: 120000,
        //     rating: 4,
        //     image: 'http://www.cryptoemporium.eu/wp-content/uploads/2019/09/Screen-Shot-2019-09-25-at-11.31.06.png'
        // }
    ],
    user: null
}

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            //Logic for adding to basket
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'REMOVE_FROM_BASKET':
            //Logic for Removing item from Basket
            let newBasket = [...state.basket]
            const index = state.basket.findIndex((baskettItem) => baskettItem.id === action.id)
            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not present in the basket`
                )
            }
            return {
                ...state,
                basket: newBasket
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;