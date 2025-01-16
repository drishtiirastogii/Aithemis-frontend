import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <h1>Ask me a Question ?</h1>
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Enter your question"
          value={value} 
          onChange={onChange} 
        />
      </div>
    </div>
  );
};

export default SearchBar;
