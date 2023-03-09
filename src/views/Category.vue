<template>
    <Topbar></Topbar>
    <div class="container mx-auto px-4 mt-4">
        <h4 class="font-light tracking-wider text-xl mb-6"><i class="fas fa-tasks"></i> {{ category.name }}</h4>
        <div class="grid grid-rows-1 gap-6" v-if="filteredProducts.length > 0">
            <div class="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide" v-if="category.childrens.length > 0">
                <template v-for="(suubcategory, index) in category.childrens" :key="index">
                    <button class="secondary-sm">{{ suubcategory.name }}</button>
                </template>
            </div>
            <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
                <ProductCard v-for="(product, index) in filteredProducts" :key="index" :product="product"></ProductCard>
            </div>
        </div>
        <div class="rounded-xl p-4 border" v-else>
            <div class="flex gap-4 w-full">
                <div class="flex flex-col justify-between gap-2 w-full">
                    <div class="text-sm">No hay productos en esta categoria 😞</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Topbar from "/src/components/Topbar.vue";
import ProductCard from "/src/components/ProductCard.vue";
import { useProducts } from "/src/composables/useProducts.js";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCategoriesStore } from "/src/stores/categoriesStore.js";

const { products } = useProducts();
const store = useCategoriesStore();
const route = useRoute();

const category = computed(() => store.getById(route.params.id));

const filteredProducts = computed(() => {
    return products.value.filter(product => product.category_parent_id == route.params.id || product.category_id == route.params.id);
});

</script>