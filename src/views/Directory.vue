<template>
    <loading :active="loadingCategories" :is-full-page="true" />
    <Topbar></Topbar>
    <div class="container mx-auto px-4 mt-4">
        <h4 class="tracking-wider font-light text-sm my-4 uppercase text-slate-600">Categorias</h4>
        <template v-for="(category, index) in categories" :key="index" class="mb-4">
            <div @click="showProductsByCategory(category.id)"
                class="font-semibold tracking-wide text-base my-4 active-item">
                {{ category.name }}
            </div>
            
            <template v-for="(subcategory, index) in category.childrens" :key="index">
                <div @click="showProductsByCategory(subcategory.id)"
                    class="tracking-wide text-base my-4 ml-4 active-item">
                    · {{ subcategory.name }}
                </div>
            </template>
        </template>

        <h4 class="tracking-wider font-light text-sm mt-8 mb-4 uppercase text-slate-600">Contacto</h4>
        <ul class="list-disc list-inside space-y-2">
            <li>
                <a href="https://instagram.com/rosehstore" target="_blank">
                    <i class="fab fa-instagram"></i>
                    Instagram
                </a>
            </li>
            <li>
                <a href="https://facebook.com/profile.php?id=100065816389343" target="_blank">
                    <i class="fab fa-facebook"></i>
                    Facebook
                </a>
            </li>
            <li>
                <a :href="`https://wa.me/505${phone}`" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Topbar from "/src/components/Topbar.vue";
import { useCategories } from "/src/composables/useCategories.js";
import { useRouter } from "vue-router";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const { categories, getCategories, loadingCategories } = useCategories();

const phone = import.meta.env.VITE_PHONE_NUMBER;
const router = useRouter();

getCategories();

function showProductsByCategory(category_id) {
    router.push({ name: 'category', params: { id: category_id } });
}

</script>