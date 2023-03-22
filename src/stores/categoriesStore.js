import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: []
    }),
    getters: {
        getById: (state) => {
            return (id) => state.categories.find((category) => category.id == id);
        }
    },
    actions: {
        set(item) {
            this.categories = item
        },
    },
    persist: true,
})