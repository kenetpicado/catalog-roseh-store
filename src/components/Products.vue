<template>
    <loading :active="loadingProducts || loadingCategories" :is-full-page="true" />
    <div class="container mx-auto px-4 mt-4">
        <template v-if="newProducts">
            <h4 class="font-bold tracking-wide text-base mb-4">Nuevos Productos</h4>
            <div class="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <ProductCard v-for="(product, index) in newProducts" :key="index" :product="product"></ProductCard>
            </div>
        </template>

        <h4 class="font-bold tracking-wide text-base my-4">Todos los Productos</h4>
        <div class="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide my-6">
            <template v-for="(category, index) in categories" :key="index">
                <button @click="showProductsByCategory(category.id)" class="secondary-sm">{{ category.name }}</button>
            </template>
        </div>
        <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
            <ProductCard v-for="(product, index) in products" :key="index" :product="product"></ProductCard>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import ProductCard from "/src/components/ProductCard.vue";
import { useProducts } from "/src/composables/useProducts.js";
import { useCategories } from "/src/composables/useCategories.js";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useRouter } from 'vue-router';

const { products, getProducts, loadingProducts } = useProducts();
const { categories, getCategories, loadingCategories } = useCategories();
const router = useRouter();

getProducts()

getCategories()

function showProductsByCategory(category_id) {
    router.push({ name: 'category', params: { id: category_id } });
}

const newProducts = computed(() => {
    return products.value.filter(product => product.is_new).slice(0, 5);
});

</script>
