import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {
    sync
} from 'vuex-router-sync'

import VueApollo from 'vue-apollo'
import {
    createApolloClient
} from './apollo.js'

import App from './App.vue'
import routes from './routes.js'
// import storeOptions from './store'
import {
    SlatePlugin
} from 'slate-vue2';
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(SlatePlugin)
Vue.config.productionTip = false
Vue.config.debug = true;
Vue.config.devtools = true;

function createApp(context) {
    const router = new VueRouter({
        mode: 'history',
        routes,
    })

    //   const store = new Vuex.Store(storeOptions)

    // sync the router with the vuex store.
    // this registers `store.state.route`
    //   sync(store, router)

    // Vuex state restoration
    //   if (!context.ssr && window.__INITIAL_STATE__) {
    //     // We initialize the store state with the data injected from the server
    //     store.replaceState(window.__INITIAL_STATE__)
    //   }

    // Apollo
    const apolloClient = createApolloClient(context.ssr)
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        ssr: process.server,
    })

    return {
        app: new Vue({
            el: '#app',
            router,
            apolloProvider,
            ...App,
        }),
        router,
        apolloProvider,
    }

    //store,
    // store,
}

export default createApp