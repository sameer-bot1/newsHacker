// const newsModel= require("../models/newsModel")
// const cheerio = require('cheerio');
// const axios = require('axios');

// exports.getNews = async (req, res) =>{
//     try {
//         const news = await IncomeSchema.find().sort({createdAt: -1})
//         res.status(200).json(news)
//     } catch (error) {
//         res.status(500).json({message: 'Server Error'})
//     }
// }

// async function scrapeHackerNews(pages = 3) {
//   try {
//     const newsItems = [];

//     for (let page = 1; page <= pages; page++) {
//       const response = await axios.get(`https://news.ycombinator.com/news?p=${page}`);
//       const $ = cheerio.load(response.data);

//       // Iterate through each news item on the current page
//       $('.athing').each((index, element) => {
//         const url = $(element).find('.title a').attr('href');
//         const hackerNewsUrl = `https://news.ycombinator.com/${$(element).find('.title a').attr('href')}`;
//         const postedOn = $(element).next().find('.age a').text().trim();
//         const upvotes = $(element).next().find('.score').text().trim();
//         const comments = $(element).next().find('a:contains("comments")').text().trim().replace(/\D/g, ''); // Extracting only numbers

//         const newsItem = {
//           url,
//           hackerNewsUrl,
//           postedOn,
//           upvotes,
//           comments,
//         };

//         newsItems.push(newsItem);
//       });
//     }

//     return newsItems;
//   } catch (error) {
//     console.error('Error:', error.message);
//     return [];
//   }
// }

// // Example usage with scraping 3 pages
// scrapeHackerNews(3).then(newsItems => {
//   console.log(newsItems);
// });
// console.log(hello);

// const newsItems = require('../scraper/scraper')
const newsModel = require('../models/newsModel'); // Assuming you have a NewsItem model defined

async function saveToMongoDB(newsItems) {
  try {
    // Save each news item to MongoDB
    for (const item of newsItems) {
      const existingItem = await newsModel.findOne({ hackerNewsUrl: item.hackerNewsUrl });

      if (existingItem) {
        // If the item already exists, update upvotes and comments
        existingItem.upvotes = item.upvotes;
        existingItem.comments = item.comments;
        await existingItem.save();
      } else {
        // If the item does not exist, create a new document
        const newNewsItem = new newsModel(item);
        await newNewsItem.save();
      }
    }

    console.log('Data saved to MongoDB.');
  } catch (error) {
    console.error('Error saving to MongoDB:', error.message);
  }
}

// exports.getNews = async (req, res) =>{
//     try {
//       const newsItems = await newsModel.find();
//       res.json({ success: true, data: newsItems });
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
//   }


module.exports = saveToMongoDB;