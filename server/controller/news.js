
const newsModel = require('../models/newsModel'); // Assuming you have a NewsItem model defined

async function saveToMongoDB(newsItems) {
  try {
    for (const item of newsItems) {
      const existingItem = await newsModel.findOne({ hackerNewsUrl: item.hackerNewsUrl });

      if (existingItem) {
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




module.exports = saveToMongoDB;