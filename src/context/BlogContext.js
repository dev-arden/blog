import React from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  return <BlogContext.Provider>{childern}</BlogContext.Provider>;
};



