'use strict';

global.fetch = require("node-fetch");
const express = require('express')
const {
    createBundleRenderer  
} = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const server = express();

const bundle = require('./dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync('./public/index.ssr.html', 'utf-8');
const PORT = 3500;

console.log("Server starting...")

const renderer = createBundleRenderer (bundle, {
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