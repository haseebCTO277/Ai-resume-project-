module.exports = {
  siteUrl: process.env.SITE_URL || "https://MagicalResume.com",
  generateRobotsTxt: true,
  exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"],
  additionalPaths: async (config) => {
    const result = [];

    // Add your blog posts here
    const blogPosts = [
      'introducing-ai-resume-builder',
      '5-essential-tips-for-crafting-standout-resume',
      'mastering-resume-formats-choosing-right-one',
      'power-of-keywords-optimizing-resume-for-ats',
      'crafting-compelling-professional-summary-resume',
      'dos-and-donts-resume-design',
      'mastering-the-ats-expert-strategies-for-crafting-an-ats-friendly-resume',
      '10-essential-resume-writing-tips',
      'proven-strategies-for-making-your-resume-stand-out-in-2024',
      'the-art-of-writing-a-resume-a-comprehensive-guide',
      'how-to-show-that-you-are-detailed-oriented-on-your-professional-resume'
    ];

    for (const post of blogPosts) {
      result.push({
        loc: `/blog/${post}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },
};