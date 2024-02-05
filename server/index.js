const express = require('express')
const cors = require('cors');
const app = express();
const { db } = require('./db/db')
// const {readdirSync} = require('fs')
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const newsModel = require('./models/newsModel');
const scrapeHackerNews = require('../server/scraper/scraper');
const saveToMongoDB = require('./controller/news');

app.use(cors())
require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use("/api/auth",authRoute); 
app.use("/api/users",userRoute); 


const server = () =>{
    db()
    app.listen(PORT,() =>
    console.log('listening to port:',PORT))
}
server()

console.log("hh")

  scrapeHackerNews(3).then(newsItems => {
    console.log(newsItems);
  });

  scrapeHackerNews(3).then(newsItems => {
    saveToMongoDB(newsItems);
  });

 
  app.get('/api/newsItems', async (req, res) => {
    try {
      const nonDeletedNewsItems = await newsModel.find({ isDeleted: false });
      res.json({ success: true, data: nonDeletedNewsItems });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });


  app.put('/api/newsItems/:id/delete', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Soft delete by marking as deleted
      const newsItem = await newsModel.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true } },
        { new: true }
      );
  
      if (!newsItem) {
        return res.status(404).json({ success: false, message: 'News item not found.' });
      }
  
      res.json({ success: true, data: newsItem });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });
  app.put('/api/newsItems/:id/markRead', async (req, res) => {
    try {
      const { id } = req.params;
      
      const newsItem = await newsModel.findByIdAndUpdate(
        id,
        { $set: { isRead: true } },
        { new: true }
      );
  
      if (!newsItem) {
        return res.status(404).json({ success: false, message: 'News item not found.' });
      }
  
      res.json({ success: true, data: newsItem });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });