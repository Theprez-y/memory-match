module.exports = function(eleventyConfig) {
  // Add this line to ensure sitemap.xml is moved to the output folder
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/images/favicon": "/" });
  eleventyConfig.addPassthroughCopy("google4a30ae3394c09ca1.html");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};