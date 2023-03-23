<template>
    <nav class="w-full flex items-center h-14 justify-between shadow px-4 bg-white">
        <div v-if="isHome">
            <i class="fas fa-bars" @click="$router.push({ name: 'directory' })" :to="{ name: 'directory'}"></i>
        </div>
        <span v-else @click="$router.back()" class="cursor-pointer">
            <i class="fas fa-chevron-left"></i>
        </span>
        <span class="font-bold text-xl tracking-wide cursor-pointer" @click="$router.push({ name: 'home' })">
            <!-- <img src="https://i.postimg.cc/s2LJMz7P/logo.png" alt="" class="w-14"> -->
            Roseh Store
        </span>
        <div @click="$router.push({ name: 'cart' })" class="flex items-center active-item cursor-pointer">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="store.itemsCount > 0"
                class="px-1.5 py-0.5 border border-white rounded-full text-xs bg-red-500 text-white">
                {{ store.itemsCount }}
            </span>
        </div>
    </nav>
</template>
<script setup>
import { useCartStore } from "/src/stores/cartStore.js";
import { useRoute } from "vue-router"
import { computed } from "vue"

const store = useCartStore();
const route = useRoute();

const isHome = computed(() => route.name === 'home')

</script>
