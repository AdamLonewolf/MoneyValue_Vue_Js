import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
app.use(VueAwesomePaginate)
app.use(router)
app.config.globalProperties.url = "http://127.0.0.1:8000/api/" //Je crée une variable globale qui sera utilisée dans toute mon application
app.mount('#app')
