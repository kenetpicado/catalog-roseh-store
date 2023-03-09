import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: []
    }),
    getters: {
        getById: (state) => {
          return (productId) => state.products.find((product) => product.id == productId);
        },
    },
    actions: {
        set(products) {
            this.products = products
        }
    },
    persist: true
})