// server-entry.js

import ApolloSSR from 'vue-apollo/ssr'
import createApp from './app.js'

export default (context) => new Promise((resolve, reject) => {
  const { app, router, store, apolloProvider } = createApp({
    ssr: true,
  })

  // set router's location
  router.push(context.url)

  // wait until router has resolved possible async hooks
  router.onReady(() => {
    // This `rendered` hook is called when the app has finished rendering
    context.rendered = () => {
      // After the app is rendered, our store is now
      // filled with the state from our components.
      // When we attach the state to the context, and the `template` option
      // is used for the renderer, the state will automatically be
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      //context.state = store.state

      // ALso inject the apollo cache state
      context.apolloState = ApolloSSR.getStates(apolloProvider)
    }
    resolve(app)
  })
})