<template>
    <loading :active="loadingProducts" :is-full-page="true" />
    <div class="container mx-auto px-4 mt-4">
        <template v-if="newProducts.length > 0">
            <h4 class="font-bold tracking-wide text-base mb-4">Nuevos Productos</h4>
            <div class="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <ProductCard v-for="(product, index) in newProducts" :key="index" :product="product"></ProductCard>
            </div>
        </template>
        
        <h4 class="font-bold tracking-wide text-base my-4">Todos</h4>
        <input type="text" v-model="search" class="input-primary mb-6" placeholder="Buscar producto">
        <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
            <ProductCard v-for="(product, index) in filteredProducts" :key="index" :product="product"></ProductCard>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ProductCard from "/src/components/ProductCard.vue";
import { useProducts } from "/src/composables/useProducts.js";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const { products, getProducts, loadingProducts } = useProducts();
const search = ref('');

getProducts()

const newProducts = computed(() => {
    return products.value.filter(product => product.is_new).slice(0, 5);
});

const filteredProducts = computed(() => {
    if (search.value === '') {
        return products.value;
    } else {
        return products.value.filter(product => product.description.toLowerCase().includes(search.value.toLowerCase()) || product.stocks.find(stock => stock.size.includes(search.value.toLowerCase())));
    }
});

</script>
