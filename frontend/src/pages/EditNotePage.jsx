import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load note");
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Failed to update note");
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-300 text-white flex flex-col items-center pt-6">
      <Navbar />
      <form
        className="w-full max-w-3xl bg-base-100 p-6 rounded-lg mt-6 shadow-lg flex flex-col gap-4"
        onSubmit={handleUpdate}
      >
        <h1 className="text-2xl font-bold text-primary">Edit Note</h1>
        <input
          type="text"
          className="input input-bordered w-full text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full text-white"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNotePage;
