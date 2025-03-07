/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://croozefm.geltaverse.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/api/*'],
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
  };