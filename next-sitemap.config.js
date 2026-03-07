/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tryai.tools",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/icon.svg", "/icon*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
