/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://walletkit.cinagroup.com',
  generateRobotsTxt: true,
  autoLastmod: false,
  exclude: [
    '/ds',
    '/ar',
    '/ar/*',
    '/de',
    '/de/*',
    '/es-419',
    '/es-419/*',
    '/fr',
    '/fr/*',
    '/hi',
    '/hi/*',
    '/id',
    '/id/*',
    '/ja',
    '/ja/*',
    '/ko',
    '/ko/*',
    '/ms',
    '/ms/*',
    '/pt-BR',
    '/pt-BR/*',
    '/ru',
    '/ru/*',
    '/th',
    '/th/*',
    '/tr',
    '/tr/*',
    '/ua',
    '/ua/*',
    '/vi',
    '/vi/*',
    '/zh-CN',
    '/zh-CN/*',
    '/zh-HK',
    '/zh-HK/*',
    '/zh-TW',
    '/zh-TW/*',
  ],
  alternateRefs: [
    {
      href: 'https://walletkit.cinagroup.com/en-US/',
      hreflang: 'en-US',
    },
    {
      href: 'https://walletkit.cinagroup.com/ar/',
      hreflang: 'ar',
    },
    {
      href: 'https://walletkit.cinagroup.com/de/',
      hreflang: 'de',
    },
    {
      href: 'https://walletkit.cinagroup.com/es-419/',
      hreflang: 'es-419',
    },
    {
      href: 'https://walletkit.cinagroup.com/fr/',
      hreflang: 'fr',
    },
    {
      href: 'https://walletkit.cinagroup.com/hi/',
      hreflang: 'hi',
    },
    {
      href: 'https://walletkit.cinagroup.com/id/',
      hreflang: 'id',
    },
    {
      href: 'https://walletkit.cinagroup.com/ja/',
      hreflang: 'ja',
    },
    {
      href: 'https://walletkit.cinagroup.com/ko/',
      hreflang: 'ko',
    },
    {
      href: 'https://walletkit.cinagroup.com/ms/',
      hreflang: 'ms',
    },
    {
      href: 'https://walletkit.cinagroup.com/pt-BR/',
      hreflang: 'pt-BR',
    },
    {
      href: 'https://walletkit.cinagroup.com/ru/',
      hreflang: 'ru',
    },
    {
      href: 'https://walletkit.cinagroup.com/th/',
      hreflang: 'th',
    },
    {
      href: 'https://walletkit.cinagroup.com/tr/',
      hreflang: 'tr',
    },
    {
      href: 'https://walletkit.cinagroup.com/ua/',
      hreflang: 'ua',
    },
    {
      href: 'https://walletkit.cinagroup.com/vi/',
      hreflang: 'vi',
    },
    {
      href: 'https://walletkit.cinagroup.com/zh-CN/',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://walletkit.cinagroup.com/zh-HK/',
      hreflang: 'zh-HK',
    },
    {
      href: 'https://walletkit.cinagroup.com/zh-TW/',
      hreflang: 'zh-TW',
    },
  ],
};
