import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage"; // import the new edit page

const App = () => {
  const [theme, setTheme] = useState("forest");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "forest" ? "coffee" : "forest");
  };

  return (
    <Router>
      <div className="min-h-screen relative p-4">
        <button
          className="btn btn-outline absolute right-0 m-2 text-xl"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "forest" ? "Forest" : "Coffee"}
        </button>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/edit/:id" element={<EditNotePage />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
