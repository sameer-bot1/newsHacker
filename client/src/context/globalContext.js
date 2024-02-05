import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Fetch non-deleted news items from the server
    axios.get('http://localhost:5000/api/newsItems')
      .then(response => {
        setNewsItems(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching news items:', error);
      });
  }, []);

  return (
    <NewsContext.Provider value={{ newsItems, setNewsItems }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };