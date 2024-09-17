import { createProxyMiddleware } from "http-proxy-middleware";

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  const targetUrl = isMobile
    ? "https://maahermobile.vercel.app"
    : "https://maaher.vercel.app";

  // Proxy the request to the appropriate target based on device type
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/",
    },
  })(req, res);
}
