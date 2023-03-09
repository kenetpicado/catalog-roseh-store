import axios from "axios";
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '/src/stores/categoriesStore.js'
import { ref } from 'vue';

export function useCategories()
{
	const store = useCategoriesStore();
	const { categories } = storeToRefs(store);
	const API_URL = import.meta.env.VITE_API_URL;
	const loadingCategories = ref(false)

	async function getCategories()
	{
		loadingCategories.value = true
		await axios.get(API_URL + '/v1/categories')
			.then(response => {
				store.set(response.data)
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				loadingCategories.value = false
			})
	}

	return { getCategories, categories, loadingCategories }
}