import { ref } from 'vue';
import axios from "axios";
import { storeToRefs } from 'pinia'
import { useProductsStore } from '/src/stores/productsStore.js'

export function useProducts()
{
	const store = useProductsStore();
	const { products } = storeToRefs(store);
	const loadingProducts = ref(false)
	const API_URL = import.meta.env.VITE_API_URL;

	async function getProducts()
	{
		loadingProducts.value = true
		await axios.get(API_URL + '/v1/products')
			.then(response => {
				store.set(response.data.data)
			})
			.catch(error => {
				console.log('aqui')
				console.log(error);
			})
			.finally(() => {
				loadingProducts.value = false
			})
	}

	return { getProducts, products, loadingProducts }
}