/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://cfm.geltaverse.com",
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
      {
        loc: "/shows",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/news/news-archive",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/c/mixtapes",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/c/contact-us",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/news/article/912-cfm-weekly-mixtape-every-wednesday",
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
