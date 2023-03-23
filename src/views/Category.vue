<template>
    <Topbar></Topbar>
    <div class="container mx-auto px-4 mt-4">
        <div class="flex justify-between items-center mb-6">
            <h4 class="font-bold tracking-wider text-xl">{{ currentCategory.name }}</h4>
            <label class="text-xs text-slate-500">{{ filteredProducts.length }} productos</label>
        </div>
        <div class="grid grid-rows-1 gap-6" v-if="filteredProducts.length > 0">
            <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
                <ProductCard v-for="(product, index) in filteredProducts" :key="index" :product="product"></ProductCard>
            </div>
        </div>
        <div class="rounded-xl p-4 border" v-else>
            <div class="flex gap-4 w-full">
                <div class="flex flex-col justify-between gap-2 w-full">
                    <div class="text-sm">Oops! No hay productos en esta categoria 😞</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Topbar from "/src/components/Topbar.vue";
import ProductCard from "/src/components/ProductCard.vue";
import { useProducts } from "/src/composables/useProducts.js";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useCategoriesStore } from "/src/stores/categoriesStore.js";

const { products } = useProducts();
const store = useCategoriesStore();
const route = useRoute();
const category = ref(null);

const currentCategory = computed(() => {
    category.value = store.categories.find((element) => element.id == route.params.id);
    
    if (!category.value) {
        category.value = store.categories.flatMap((element) => element.childrens).find((child) => child.id == route.params.id)
    }

    return category.value
});

const filteredProducts = computed(() => {
    return products.value.filter(product => product.category_parent_id == route.params.id || product.category_id == route.params.id);
});

</script>