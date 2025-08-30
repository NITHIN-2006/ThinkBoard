import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";
import formatDate from "../components/lib/utils";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch note");
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-base-300 text-white flex flex-col items-center pt-6">
      <Navbar />
      <div className="w-full max-w-3xl bg-base-100 rounded-lg p-6 mt-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-primary">{note.title}</h1>
        <p className="text-base-content/80 mb-4">{note.content}</p>
        <p className="text-sm text-base-content/60">
          Created: {formatDate(new Date(note.createdAt))}
        </p>
        <p className="text-sm text-base-content/60">
          Last Updated: {formatDate(new Date(note.updatedAt))}
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
