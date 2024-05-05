import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";

const App = () => {
  return (
    <div className="App font-opensans">
      <Routes>     
        <Route index path="/" element={<HomePage />} />
        <Route index path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
