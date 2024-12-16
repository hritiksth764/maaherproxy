import { createProxyMiddleware } from "http-proxy-middleware";

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  const targetUrl = isMobile
    ? "https://maahermobile.vercel.app"
    : "https://maaher.vercel.app";

  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/", // Keep the path structure intact
    },
    onProxyRes(proxyRes, req, res) {
      // Ensure Location headers are rewritten to use the custom domain
      const locationHeader = proxyRes.headers["location"];
      if (locationHeader) {
        proxyRes.headers["location"] = locationHeader.replace(
          /(https?:\/\/)(maaher\.vercel\.app|maahermobile\.vercel\.app)/i,
          "https://maaher.life"
        );
      }
    },
  })(req, res);
}
