// scraper.js
const cheerio = require('cheerio');
const axios = require('axios');


async function scrapeHackerNews(pages = 3) {
    try {
      const newsItems = [];
  
      for (let page = 1; page <= pages; page++) {
        const response = await axios.get(`https://news.ycombinator.com/news?p=${page}`);
        const $ = cheerio.load(response.data);
  
        $('.athing').each((index, element) => {
          const title = $(element).find('.title a').text().trim();
          const url = $(element).find('.title a').attr('href');
          const hackerNewsUrl = `https://news.ycombinator.com/${$(element).find('.title a').attr('href')}`;
          const postedOn = $(element).next().find('.age a').text().trim();
          const upvotes = $(element).next().find('.score').text().trim();
          const comments = $(element).next().find('a:contains("comments")').text().trim().replace(/\D/g, ''); // Extracting only numbers
          const user = $(element).next().find('.hnuser').text().trim();
  
          const newsItem = {
            title,
            url,
            hackerNewsUrl,
            postedOn,
            upvotes,
            comments,
            user
          };
  
          newsItems.push(newsItem);
        });
      }
  
      return newsItems;
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  }

module.exports = scrapeHackerNews;