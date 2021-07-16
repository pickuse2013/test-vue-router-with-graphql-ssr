'use strict';
const express = require('express')
const vueServerRenderer = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const server = express();
const bundle = require('./dist/vue-ssr-server-bundle.json');
//const template = fs.readFileSync('./public/index.ssr.html', 'utf-8');
const setupDevServer = require('./webpack/setup-dev-server');
const isProduction = process.env.NODE_ENV === "production";
const createRenderer = (bundle) => {
    return vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8')
    });
}

let renderer;
if (isProduction) {
    // production
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));
} else {
    // development
    setupDevServer(server, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
}


server.use('/public', express.static(path.resolve(__dirname, './public')));

server.get('*', (req, res) => {
    const context = {
        title: 'Vue JS - Server Render',
        meta: `<meta description="vuejs server side render">`,
        url: req.url
    };

    res.setHeader("Content-Type", "text/html");

    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(400).send('404 | Page Not Found');
            } else {
                console.log(err);
                res.status(500).send('500 | Internal Server Error');
            }
        }

        res.end(html);
    });
});

const port = 8080;

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
    console.log("Server mode:", (isProduction) ? "Production" : "development")
});