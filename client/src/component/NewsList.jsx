// src/NewsList.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { NewsContext } from '../context/globalContext';


const NewsList = () => {
    const { newsItems, setNewsItems } = useContext(NewsContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    const paginatedNewsItems = newsItems
        .filter(item => !item.isDeleted)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Add functions to mark as read and delete
    const markAsRead = (id) => {
        // Update the state locally
        const updatedNewsItems = newsItems.map(item => (
            item._id === id ? { ...item, isRead: true } : item
        ));
        setNewsItems(updatedNewsItems);

        // Update the server
        axios.put(`http://localhost:5000/api/newsItems/${id}/markRead`)
            .catch(error => {
                console.error('Error marking as read:', error);
            });
    };

    const deleteNewsItem = (id) => {
        // Update the state locally (soft delete)
        const updatedNewsItems = newsItems.map(item => (
            item._id === id ? { ...item, isDeleted: true } : item
        )).filter(item => !item.isDeleted); // Remove the deleted item from the list
        setNewsItems(updatedNewsItems);

        // Update the server (soft delete)
        axios.delete(`http://localhost:5000/api/newsItems/${id}/delete`)
            .catch(error => {
                console.error('Error deleting news item:', error);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const Container = styled.div`
        /* display: flex; */
        
    `
    const Wrapper = styled.div`
        margin:4px;
    `

    return (
        
            <Container>
                <Wrapper>
                <ol start={(currentPage - 1) * itemsPerPage + 1}>
                    {paginatedNewsItems.map(item => (
                        
                        <li key={item._id}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            <p>Upvotes: {item.upvotes}</p>
                            <p>Comments: {item.comments}</p>
                            <p>Posted on: {item.postedOn}</p>
                            {!item.isRead && (
                                <div>
                                    <button onClick={() => markAsRead(item._id)}>Mark as Read</button>
                                </div>
                            )}
                            <button onClick={() => deleteNewsItem(item._id)}>Delete</button>
                        </li>
                    ))}
                </ol>
                <div>
                    {currentPage > 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</button>
                        )}
                    {currentPage * itemsPerPage < newsItems.filter(item => !item.isDeleted).length && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
                        )}
                </div>
            </Wrapper>
            </Container>
        
    );
};

export default NewsList;
