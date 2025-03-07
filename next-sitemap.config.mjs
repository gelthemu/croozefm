/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://croozefm.geltaverse.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/", "/api/*"],
  additionalPaths: async () => {
    return [
      {
        loc: "/home",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/news",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
    ];
  },
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

export default config;
