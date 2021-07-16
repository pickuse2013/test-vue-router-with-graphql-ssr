'use strict';
const express = require('express')
const {
    createBundleRenderer
} = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const server = express();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack/webpack.dev.js');
var compiler = webpack(webpackConfig);
const bundle = require('./dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync('./public/index.ssr.html', 'utf-8');

server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    quiet: true,
    stats: {
        colors: true
    },
    serverSideRender: true
}));
server.use(webpackHotMiddleware(compiler));

const PORT = 3500;
const isProduction = process.env.NODE_ENV === "production";


console.log("Server starting...")
console.log("Server isProduction:", isProduction)

const renderer = createBundleRenderer(bundle, {
    template: template
});

server.use('/public', express.static(path.resolve(__dirname, './public')));

server.get('*', (req, res) => {

    // bundle.default({
    //     url: req.url
    // }).then((app) => {
    //context to use as data source
    //in the template for interpolation
    const context = {
        title: 'Vue JS - Server Render',
        meta: `<meta description="vuejs server side render">`,
        url: req.url
    };

    res.setHeader("Content-Type", "text/html");
    //res.write("1234")

    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(400).send('Not found');
            } else {
                console.log(err);
                res.status(500).send('Internal server error');
            }
        } else {
            res.send(html);
        }
    });
    // })

});

const port = PORT || 3000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
});