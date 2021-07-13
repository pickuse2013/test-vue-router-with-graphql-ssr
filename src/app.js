import Vue from 'vue'
import App from './App.vue'
import {
    createRouter
} from './router'
import {
    createProvider
} from './vue-apollo'
import {
    SlatePlugin
} from 'slate-vue2';

Vue.use(SlatePlugin)

Vue.config.productionTip = false
Vue.config.debug = true;
Vue.config.devtools = true;

export async function createApp({
    context, // eslint-disable-line no-unused-vars
    beforeApp = () => {},
    afterApp = () => {}
} = {}) {
    const router = createRouter();

    const apolloProvider = createProvider({
        ssr: process.server
    });

    await beforeApp({
        router,
        apolloProvider
    });

    const app = new Vue({
        router,
        apolloProvider,
        render: h => h(App)
    });

    const result = {
        app,
        router,
        apolloProvider
    };

    await afterApp(result);

    return result;
}