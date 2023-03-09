<template>
	<Topbar></Topbar>
	<ProductDetails :product="product"></ProductDetails>
</template>

<script setup>
import Topbar from "/src/components/Topbar.vue";
import ProductDetails from "/src/components/ProductDetails.vue";
import { useProductsStore } from '/src/stores/productsStore.js'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useProductsStore();

const product = computed(() => store.getById(route.params.id));

</script>