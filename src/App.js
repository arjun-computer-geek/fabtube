import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Player } from "components";
import { Home, VideoDetailsPage } from "pages";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<VideoDetailsPage />} >
          <Route path=":videoId" element={<Player />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
