// ParentComponent.js

import React, { useState } from 'react';
import Recipe from './Recipes';
import Navbar from './Navbar';

function ParentComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar showSearch={true} setSearchQuery={setSearchQuery} handleSearchChange={handleSearchChange} />
      <Recipe searchQuery={searchQuery} />
    </>
  );
}

export default ParentComponent;
