import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router/index.js'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar';
import Popover from 'primevue/popover';
import OverlayPanel from 'primevue/overlaypanel'
import Dialog from 'primevue/dialog';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Button', Button);
app.component('Avatar', Avatar);
app.component('Popover', Popover);
app.component('OverlayPanel', OverlayPanel);
app.component('Dialog', Dialog);

app.mount('#app')
