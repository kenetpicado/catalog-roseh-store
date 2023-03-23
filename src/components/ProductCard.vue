<template>
    <div @click="showDetails(product.id)" class="mb-4" style="min-width:10rem; max-width: 15rem;">
        <img :src="product.image" alt="" class="rounded-lg shadow-xl">
        <div class="mt-4">
            <div class="text-xs tracking-wide truncate uppercase">{{ product.description }}</div>
            <div class="text-md tracking-wide font-bold mt-2">
                C$ {{ product.stocks[0].price }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

function showDetails(id) {
    router.push({ name: 'details', params: { id: id } });
}
</script>
