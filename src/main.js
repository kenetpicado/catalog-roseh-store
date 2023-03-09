import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '/src/router/routes.js'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()

const options = {
	confirmButtonColor: '#1f2937',
	cancelButtonColor: '#f3f4f6',
	color: '#1f2937',
	customClass: {
		confirmButton: 'btn-primary mr-4',
		cancelButton: 'btn-secondary'
	},
	buttonsStyling: false
};

pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).use(VueSweetalert2, options).mount('#app')
