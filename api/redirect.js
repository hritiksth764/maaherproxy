export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  // If mobile, serve content from the mobile version
  if (isMobile) {
    res.redirect(308, "https://maahermobile.vercel.app");
  } else {
    // If desktop, serve content from the desktop version
    res.redirect(308, "https://maaher.vercel.app");
  }
}
