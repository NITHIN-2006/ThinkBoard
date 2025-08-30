import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import NoteCard from "../components/NoteCard";
const Homepage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen items-center text-white pt-6">
      <Navbar />

      {notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12 text-primary">
          {notes.map((note) => (
          <NoteCard key={note.id} note={note}/>
          ))}
        </div>
      )}

      <h1 className="text-2xl text-primary mb-6">Welcome to ThinkBoard</h1>
    </div>
  );
};

export default Homepage;
