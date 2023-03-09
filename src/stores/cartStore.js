import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: []
    }),
    getters: {
        itemsCount(state) {
          return state.cart.length
        },
        findThisItem(state) {
            return function(id, size) {
                return state.cart.find(cartItem => cartItem.id === id && cartItem.size === size)
            }
        },
    },
    actions: {
        set(item) {
            this.cart.push(item)
        },
        resetValue() {
            this.cart = []
        },
        removeItem(index) {
            this.cart.splice(index, 1)
        },
    },
    persist: true,
})