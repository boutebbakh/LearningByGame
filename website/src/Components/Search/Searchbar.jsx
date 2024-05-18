import React, { useState } from 'react';
import axios from 'axios';
import './Searchbar.css';

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your Spring Boot backend
      const response = await axios.get(`http://localhost:8080/api/v1/student/search/${searchQuery}`);
      console.log('Search results:', response.data);
      
      // Handle the response data as needed, such as updating state or rendering results
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="srch-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i className="fas fa-search search-icon" onClick={handleSearch}></i>
    </div>
  );
};
