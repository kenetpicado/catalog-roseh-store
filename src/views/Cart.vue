<template>
	<Topbar></Topbar>
	<div class="container mx-auto px-4 mt-4">
		<h4 class="font-bold tracking-wide text-base my-4"><i class="fas fa-shopping-cart"></i> Carrito</h4>
		<template v-for="(item, index) in cart" :key="index">
			<div class="rounded-xl my-4 p-4 border active-item">
				<div class="flex gap-4 w-full">
					<img :src="item.image" alt="" class="rounded-xl object-contain h-24 w-24" v-if="item.image">
					<div class="flex flex-col justify-between gap-2 w-full">
						<div class="text-sm uppercase">{{ item.description }}</div>
						<div class="text-xs text-slate-400">{{ item.size }}</div>
						<div class="flex justify-between">
							<button @click="confirmDeleteItem(index)" type="button" class="text-red-500 select-none py-1 px-2 bg-slate-100 rounded-lg text-xs">
								Eliminar
							</button>
							<div class="font-bold text-lg">
								C$ {{ item.price }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<div v-if="cart.length == 0" class="rounded-xl my-4 p-4 border">
			<div class="flex gap-4 w-full">
				<div class="flex flex-col justify-between gap-2 w-full">
					<div class="text-sm">No hay productos en el carrito</div>
				</div>
			</div>
		</div>
		<div v-else class="mb-10">
			<div class="text-right font-bold text-lg my-2 px-4">Total: C$ {{ total.toLocaleString() }}</div>
			<a :href="`https://wa.me/505${phone}?text=${textMessage}`" class="btn-primary font-bold py-4">Comprar <i class="fab fa-whatsapp"></i></a>
		</div>
    </div>
</template>

<script setup>
import Topbar from "/src/components/Topbar.vue";
import { storeToRefs } from 'pinia'
import { useCartStore } from '/src/stores/cartStore.js'
import { computed, inject } from 'vue';
import { toast } from "/src/utils/toast.js"

const store = useCartStore();
const { cart } = storeToRefs(store);

const swal = inject('$swal')

const total = computed(() => {
	return cart.value.reduce((total, item) => total + item.price, 0);
});

const phone = import.meta.env.VITE_PHONE_NUMBER;

const textMessage = computed(() => {
	return `Hola, quiero comprar los siguientes productos:%0A%0A${productsMessage.value}Total: C$ ${total.value.toLocaleString()}`;
});

const productsMessage = computed(() => {
	return cart.value.reduce((text, item) => text + `${item.sku}%0A${item.description}%20(${item.size})%20-%20C$%20${item.price}%0A%0A`, '');
});

function confirmDeleteItem(index) {
	swal({
		title: 'Eliminar',
		text: "Esta acción no se puede deshacer",
		showCancelButton: true,
		confirmButtonText: 'Eliminar',
	})
	.then((result) => {
		if (result.isConfirmed) {
			store.removeItem(index);
			toast.success('Producto eliminado del carrito');
		}
	})
}

</script>