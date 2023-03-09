<template>
    <nav class="w-full flex items-center h-14 justify-between shadow px-4 bg-white">
        <span @click="$router.back()"><i class="fas fa-chevron-left"></i></span>
        <span class="font-bold text-xl tracking-wide cursor-pointer" @click="$router.push({name:'home'})">Roseh Store</span>

        <div @click="$router.push({name: 'cart'})" class="flex items-center active-item">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="store.itemsCount > 0" class="px-1.5 py-0.5 border border-white rounded-full text-xs bg-red-500 text-white">
              {{ store.itemsCount }}
            </span>
        </div>

    </nav>
</template>
<script setup>
import { useCartStore } from "/src/stores/cartStore.js";
const store = useCartStore();
</script>
