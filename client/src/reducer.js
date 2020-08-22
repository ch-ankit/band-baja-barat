export const initialState = {
    basket: [
    ],
    user: { userName: 'junushu' },
    isAdmin: false,

}

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            //Logic for adding to basket
            let newBasket = [...state.basket]
            if (newBasket.length !== 0) {
                const condition = Object.keys(newBasket).findIndex(item => newBasket[item].id === action.item.id)
                if (condition !== -1) {
                    newBasket[condition] = {
                        ...newBasket[condition],
                        price: newBasket[condition].price + action.item.price,
                        quantity: newBasket[condition].quantity + action.item.quantity
                    }
                    return {
                        ...state,
                        basket: newBasket,
                    }
                } else {
                    return {
                        ...state,
                        basket: [...state.basket, action.item]
                    }
                }
            } else {
                return {
                    ...state,
                    basket: [...state.basket, action.item],
                }
            }
        case 'REMOVE_FROM_BASKET':
            //Logic for Removing item from Basket
            let newBaskets = [...state.basket]
            const index = state.basket.findIndex((baskettItem) => baskettItem.id === action.id)
            if (index >= 0) {
                newBaskets.splice(index, 1)
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not present in the basket`
                )
            }
            return {
                ...state,
                basket: newBaskets
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "ADD_PRODUCTS":
            return {
                ...state,
                product: action.item
            }
        default:
            return state;
    }
}

export default reducer;