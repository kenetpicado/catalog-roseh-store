<template>
    <div class="container mx-auto px-8 my-8">

        <div class="grid grid-cols-1 gap-4 mx-4">
            <img :src="product.image" alt="" class="rounded-xl mx-auto shadow-xl mb-4">
            <h4 class="font-semibold tracking-wider text-sm text-center uppercase">
                {{ product.description }}
            </h4>
            <h4 class="font-light tracking-wider text-xs text-center">
                <span v-if="product.category_parent_name">{{ product.category_parent_name }} / </span>
                {{ product.category_name }}
            </h4>
            <div class="flex gap-2">
                <button type="button" v-for="(stock, index) in product.stocks" :key="index" :class="activeClass(stock.id)" @click="selectItem(stock)">
                    {{ stock.size }}
                </button>
            </div>

            <template v-if="colors.length > 0">
                <div class="text-xs text-slate-500 mt-4">Disponibles</div>
                <div class="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <button type="button" v-for="(color, index) in colors" :key="index">
                        <div class="circle active-item select-none" :style="`background-color: ${color}`"></div>
                    </button>
                </div>
            </template>

            <div class="flex justify-between items-center mt-4">
                <span class="text-2xl font-bold tracking-wider">C$ {{ selectedItem.price }}</span>
                <button @click="addToCart()" class="btn-primary"><i class="fas fa-shopping-cart"></i></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from "/src/stores/cartStore.js";
import { toast } from "/src/utils/toast.js"

const store = useCartStore();

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const selectedItem = ref({});
const colors = ref([]);
const selectedColor = ref('');

onMounted(() => {
    selectedItem.value = props.product.stocks[0];
    colors.value = props.product.stocks[0].colors;
});

function activeClass(id) {
    return selectedItem.value.id == id ? 'primary-sm' : 'secondary-sm';
}

function selectItem(stock) {
    selectedItem.value = stock;
    colors.value = stock.colors;
}

function addToCart() {
    if (store.findThisItem(props.product.id, selectedItem.value.size)) {
        toast.error('Este producto ya está en el carrito');
    } else {
        store.set({
            id: props.product.id,
            sku: props.product.sku,
            description: props.product.description,
            image: props.product.image,
            price: selectedItem.value.price,
            quantity: 1,
            size: selectedItem.value.size
        });
        toast.success('Producto agregado al carrito');
    }
}

</script>
