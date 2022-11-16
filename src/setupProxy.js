const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'http://3.134.81.24:5000',
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};