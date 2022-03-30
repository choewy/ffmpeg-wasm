import { createProxyMiddleware } from "http-proxy-middleware";

if (process.env.NODE_ENV === "development") {
    module.exports = function (app: any) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
            })
        );
    };
};
