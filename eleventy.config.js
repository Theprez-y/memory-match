module.exports = function(eleventyConfig) {
  
  // Copy our static files to the output folder
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/images/favicon": "/" });
  // If you have an assets or images folder, add it here too:
  // eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};