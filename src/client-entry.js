// client-entry.js

import createApp from './app'
const { app, router } = createApp(); //{ state: window.__INITIAL_STATE__ }
// createApp({
// 	ssr: false,
// })

router.onReady(() => {
	app.$mount('#app');
});