import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill in all fields");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/notes", { title, content });
      setLoading(false);
      navigate("/"); 
    } catch (error) {
      console.error("Error creating note:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 text-white flex flex-col items-center pt-6">
      <Navbar />
      <div className="w-full max-w-md mt-10 p-6 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-primary">Create a New Note</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="textarea textarea-bordered w-full text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
